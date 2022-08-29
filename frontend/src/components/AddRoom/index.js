import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ContentLoader from "../ContentLoader";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { addRoom } from "../../api/Axios";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import "./style.css";

const AddRoom = ({ open, onCloseDialog }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const [roomError, setRoomError] = useState("");
  const [roomDescriptionError, setRoomDescriptionError] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!roomName) {
      setRoomError("Room name must be valid!");
    } else if (!roomDescription) {
      setRoomDescriptionError("Provide a room description!");
    } else {
      dispatch(addRoom(roomName, roomDescription));
      onCloseDialog();
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className="dialog-root">
      <DialogTitle className="dialog-title-root">
        Create/Join a Room.
      </DialogTitle>
      <DialogContent dividers>
        <Box alignItems="center" m={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            size={""}
            className="text-field-root"
            variant="outlined"
            label="Room Name"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setRoomError("");
            }}
            helperText={roomError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" variant="standard">
                  <IconButton aria-label="Room" edge="end">
                    <TitleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box alignItems="center" m={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            size={""}
            className="text-field-root"
            variant="outlined"
            label="Room Description"
            value={roomDescription}
            onChange={(e) => {
              setRoomDescription(e.target.value);
              setRoomDescriptionError("");
            }}
            helperText={roomDescriptionError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" variant="standard">
                  <IconButton aria-label="Room Description" edge="end">
                    <DescriptionIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ContentLoader />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button onClick={onCloseDialog} color="secondary">
            Cancel
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoom;
