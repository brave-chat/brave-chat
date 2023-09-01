import React from "react";
import { Badge, Box, Typography, useTheme } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/appReducer/selectors";
import { checkHtml } from "../../Helper";

const ChatUserCell = ({ data, currentUser, onUserSelect }) => {
  const theme = useTheme();
  const userSelected = useSelector(selectedUser);

  const [date, time] = data.last_message_time.split("T");
  const momentDate = moment.utc().format("YYYY-MM-DD");

  const getBadgeStatusClass = () => {
    if (data.chat_status === "online") {
      return "badge-online";
    }

    if (data.chat_status === "busy") {
      return "badge-busy";
    }

    return "badge-offline";
  };
  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: theme.palette.background.main,
        ":hover": {
          backgroundColor: theme.palette.action.hover,
        },
        ...(userSelected &&
          userSelected.email === data.email && {
            backgroundColor: theme.palette.action.hover,
          }),
      }}
      onClick={() => onUserSelect(data)}
    >
      <Box sx={{ position: "relative" }}>
        <Badge
          classes={{ root: "status-dot", badge: getBadgeStatusClass() }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_picture} alt={data.first_name} />
        </Badge>
      </Box>
      <Box sx={{ width: "calc(100% - 40px)", paddingLeft: theme.spacing(2) }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component="div"
            variant="subtitle2"
            sx={{
              fontSize: theme.typography.pxToRem(22),
              position: "relative",
            }}
          >
            {data.first_name}
          </Typography>
          <Box
            sx={{
              color: theme.palette.text.primary,
              fontSize: theme.typography.pxToRem(12),
              marginLeft: "auto",
            }}
          >
            {date === momentDate ? `${time} UTC` : date}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: theme.typography.pxToRem(15),
              color: theme.palette.text.secondary,
              paddingRight: theme.spacing(0.625),
              width: "calc(100% - 24px)",
            }}
          >
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
            <Box
              component="span"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: theme.palette.info.main,
                color: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                paddingTop: theme.spacing(0.188),
                fontSize: theme.typography.pxToRem(14),
                lineHeight: 1,
                height: theme.spacing(3),
                width: theme.spacing(3),
                borderRadius: theme.spacing(5),
                zIndex: 1,
              }}
            >
              {data.nb_unread_message}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatUserCell;
