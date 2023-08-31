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

const AddJoinRoom = ({ join, open, onCloseDialog }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomError, setRoomError] = useState("");
  const [roomDescriptionError, setRoomDescriptionError] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  const onSubmit = (event) => {
    event.preventDefault();
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
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle
        sx={{
          fontSize: 16,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[500],
          border: `3px solid ${theme.palette.primary.main}`,
        }}
      >
        {join ? "Join" : "Create"} a Room.
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: theme.palette.background.primary }}
        dividers
      >
        <Box component="form" onSubmit={onSubmit}>
          <Box
            alignItems="center"
            m={{ xs: 2, md: 6 }}
            pt={{ xs: 4, md: 0 }}
            pb={{ xs: 4, md: 0 }}
            sx={{
              color: theme.palette.text.primary,
              ml: theme.spacing(1),
              mb: 0,
            }}
          >
            <Typography variant="body1">
              Room Name
              <span
                style={{ color: theme.palette.error.main, marginLeft: "5px" }}
              >
                *
              </span>
            </Typography>
            <AppTextInput
              fullWidth
              size=""
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
                      <TitleIcon
                        style={{ color: theme.palette.text.primary }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {!join && (
            <Box
              alignItems="center"
              m={{ xs: 2, md: 6 }}
              pt={{ xs: 4, md: 0 }}
              pb={{ xs: 4, md: 0 }}
              sx={{
                color: theme.palette.text.primary,
                ml: theme.spacing(1),
                mb: 0,
              }}
            >
              <Typography variant="body1">
                Room Description
                <span
                  style={{ color: theme.palette.error.main, marginLeft: "5px" }}
                >
                  *
                </span>
              </Typography>
              <AppTextInput
                fullWidth
                size=""
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
                        <DescriptionIcon
                          style={{ color: theme.palette.text.primary }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
          <ContentLoader variant="info" />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button onClick={onCloseDialog} color="secondary">
              Cancel
            </Button>
            <Box sx={{ ml: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddJoinRoom;
