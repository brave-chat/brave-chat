import React from "react";
import { Badge, Box } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import "../style.css";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import moment from "moment";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";

const ChatUserCell = ({ data, currentUser, onUserSelect }) => {
  const [date, time] = data.last_message_time.split("T");
  const momentDate = moment.utc().format("YYYY-MM-DD");
  const getBadgeStatusClass = () => {
    if (data.user_status === "online") {
      return "badge-online";
    }

    if (data.user_status === "away") {
      return "badge-away";
    }

    return "badge-offline";
  };

  return (
    <Box
      className={clsx("chat-cell-item", {
        active: currentUser && currentUser.email === data.email,
      })}
      onClick={() => onUserSelect(data)}
    >
      <Box className="chat-avatar-root">
        <Badge
          classes={{ root: "status-dot", badge: getBadgeStatusClass() }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_picture} alt={data.first_name} />
        </Badge>
      </Box>
      <Box className="chat-cell-info">
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            variant="subtitle2"
            className="title-root"
          >
            {data.first_name}
          </Typography>
          <Box color="primary" fontSize={12} ml="auto">
            {date === momentDate ? time + " UTC" : date}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography className="chat-root">
            {checkHtml(data.content) ? (
              parse(data.content)
            ) : (
              <ReactMarkdown
                children={data.content}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </Typography>
          {data.nb_unread_message > 0 ? (
            <Box component="span" className="nav-count">
              {data.nb_unread_message}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatUserCell;
