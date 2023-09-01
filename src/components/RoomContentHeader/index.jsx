import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme(); // Access the theme object

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        justifyContent: "space-between",
      }}
      ref={divRef}
    >
      <IconButton onClick={handleButtonClose}>
        <KeyboardBackspaceIcon />
      </IconButton>
      <Box
        sx={{
          p: { xs: theme.spacing(1), md: theme.spacing(1) },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
          className="room-info"
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "22px",
              color: theme.palette.text.primary,
            }}
          >
            {"# " + room.room_name}
          </Typography>
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
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
        <Box
          sx={{
            p: { xs: theme.spacing(4), md: theme.spacing(6) },
            display: "flex",
            flexDirection: "column",
          }}
          className="room-info"
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "22px",
              color: theme.palette.text.primary,
            }}
          >
            {"# " + room.room_name}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: theme.palette.text.primary,
            }}
          >
            {room.description}
          </Typography>
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
