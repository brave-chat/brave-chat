import React from "react";
import { Badge, Box } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import "../style.css";

const ContactCell = ({ data, currentUser, onContactSelect }) => {
  const getBadgeStatusClass = () => {
    if (data.status === "online") {
      return "badge-online";
    }

    if (data.status === "busy") {
      return "badge-busy";
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
      <Box className={"chat-avatar-root"}>
        <Badge
          classes={{ root: "status-dot", badge: getBadgeStatusClass() }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_picture} alt={data.name} />
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
        </Box>
        <Typography className="chat-des-root">{data.profile_status}</Typography>
      </Box>
    </Box>
  );
};

export default ContactCell;
