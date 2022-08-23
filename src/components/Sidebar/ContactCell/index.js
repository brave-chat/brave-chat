import React from "react";
import { Badge, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../../CustomAvatar";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import "../style.css";
import {
  selectedUser,
} from "../../../redux/appReducer/selectors";
import {
  onUserSelect,
} from "../../../redux/appReducer/actions";

const ContactCell = ({ data, currentUser }) => {
  const dispatch = useDispatch();
  const getBadgeStatusClass = () => {
    if (data.chat_status === "online") {
      return "badge-online";
    }

    if (data.chat_status === "busy") {
      return "badge-busy";
    }

    return "badge-offline";
  };

  const updateChatSelectedUser = () => {
    dispatch(onUserSelect(data));
  };

  return (
    <Box
      className={clsx("chat-cell-item", {
        active: currentUser && currentUser.pk === data.pk,
      })}
      onClick={updateChatSelectedUser}
    >
      <Box className={"chat-avatar-root"}>
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
        </Box>
        <Typography className="chat-root">{data.bio}</Typography>
      </Box>
    </Box>
  );
};

export default ContactCell;
