import React from "react";
import { Box } from "@mui/material";
import "../Sidebar/style.css";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { onRoomSelect } from "../../redux/appReducer/actions";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import {
  removeRoom,
  deleteRoomConversation,
  invitePeople,
} from "../../api/Axios";
import { leaveRoomSocket } from "../../api/Socket";
import clsx from "clsx";
import { v4 as uuid } from "uuid";

import Popover from "@mui/material/Popover";
const actions = [
  { label: "Room Description", slug: "description" },
  { label: "Delete Messages", slug: "delete" },
  { label: "Invite People", slug: "invite" },
  { label: "Leave Room", slug: "leave" },
];

const RoomContentHeader = ({ room }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;
  const divRef = React.useRef();

  const onOptionItemClick = (item) => {
    switch (item.slug) {
      case "description":
        setAnchorEl(divRef.current);
        break;
      case "delete":
        dispatch(deleteRoomConversation(room, onRoomSelect));
        handleClose();
        break;
      case "leave":
        dispatch(removeRoom(room.room_name, onRoomSelect));
        handleClose();
        break;
      case "invite":
        const inviteLink = `${window.location.href}/${
          room.room_name
        }/${uuid()}`;
        dispatch(invitePeople(room.room_name, inviteLink));
        navigator.clipboard.writeText(inviteLink);
        handleClose();
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClose = () => {
    dispatch(onRoomSelect(null));
    dispatch(leaveRoomSocket());
  };

  return (
    <Box className="app-content-header" ref={divRef}>
      <IconButton className="back-btn" onClick={handleButtonClose}>
        <KeyboardBackspaceIcon />
      </IconButton>
      <Box p={{ xs: 1, md: 1 }}>
        <Box className="room-root">
          <Box className={clsx("room-info", "custom-room-info")}>
            <Typography className="room-title" component="h3" variant="h6">
              {"# " + room.room_name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={{ xs: 4, md: 6 }}>
          <Box className="room-root">
            <Box className={clsx("room-info", "custom-room-info")}>
              <Typography className="room-title" component="h3" variant="h6">
                {"# " + room.room_name}
              </Typography>
              <Typography className="room-sub-title" component="span">
                {room.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Popover>
      <Box ml="auto">
        <DropdownMenu
          TriggerComponent={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          items={actions}
          onItemClick={onOptionItemClick}
        />
      </Box>
    </Box>
  );
};

export default RoomContentHeader;
