import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
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
import { useTheme } from "@mui/material/styles";

import "./style.css";

const AddJoinRoom = ({ join, open, onCloseDialog }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const [roomError, setRoomError] = useState("");
  const [roomDescriptionError, setRoomDescriptionError] = useState("");

  const dispatch = useDispatch();
  const theme = useTheme();

  const onSubmit = () => {
    if (!roomName) {
      setRoomError("Room name must be valid!");
    } else if (join) {
      dispatch(addRoom(roomName, roomDescription, 1, onCloseDialog));
    } else if (!join && !roomDescription) {
      setRoomDescriptionError("Provide a room description!");
    } else {
      dispatch(addRoom(roomName, roomDescription, 0, onCloseDialog));
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className="dialog-root">
      <DialogTitle className="dialog-title-root">
        {join ? "Join" : "Create"} a Room.
      </DialogTitle>
      <DialogContent dividers>
        <Box
          alignItems="center"
          m={{ xs: 2, md: 6 }}
          pt={{ xs: 4, md: 0 }}
          pb={{ xs: 4, md: 0 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              ml: theme.spacing(1),
              mb: 0,
            }}
          >
            Room Name
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </Typography>
          <AppTextInput
            fullWidth
            size={""}
            className="text-field-root"
            variant="outlined"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setRoomError("");
            }}
            helperText={roomError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" variant="standard">
                  <IconButton aria-label="Room" edge="end" disabled>
                    <TitleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {!join ? (
          <Box
            alignItems="center"
            m={{ xs: 2, md: 6 }}
            pt={{ xs: 4, md: 0 }}
            pb={{ xs: 4, md: 0 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "common.white",
                ml: theme.spacing(1),
                mb: 0,
              }}
            >
              Room Description
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </Typography>
            <AppTextInput
              fullWidth
              size={""}
              className="text-field-root"
              variant="outlined"
              value={roomDescription}
              onChange={(e) => {
                setRoomDescription(e.target.value);
                setRoomDescriptionError("");
              }}
              helperText={roomDescriptionError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton
                      aria-label="Room Description"
                      edge="end"
                      disabled
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ) : null}
        <ContentLoader variant="info" />
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

export default AddJoinRoom;
