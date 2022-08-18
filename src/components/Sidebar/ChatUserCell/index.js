import React from "react";
import { Badge, Box } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import "../style.css";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

const ChatUserCell = ({ data, currentUser, onContactSelect }) => {
  const getBadgeStatusClass = () => {
    if (data.status === "online") {
      return "badge-online";
    }

    if (data.status === "away") {
      return "badge-away";
    }

    return "badge-offline";
  };

  return (
    <Box
      className={clsx("chat-cell-item", {
        active: currentUser && currentUser.id === data.id,
      })}
      onClick={() => onContactSelect(data)}
    >
      <Box className="chat-avatar-root">
        <Badge
          classes={{ root: "status-dot", badge: getBadgeStatusClass() }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_pic} alt={data.name} />
        </Badge>
      </Box>
      <Box className="chat-cell-info">
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            variant="subtitle2"
            className="title-root"
          >
            {data.name}
          </Typography>
          <Box color="text.secondary" fontSize={12} ml="auto">
            {data.lastMessageTime}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography className="chat-des-root">{data.lastMessage}</Typography>
          {data.unreadMessage && (
            <Box component="span" className="nav-count">
              {data.unreadMessage}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatUserCell;
