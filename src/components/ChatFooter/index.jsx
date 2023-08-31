import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/Attachment";
import CustomTextInput from "../CustomTextInput";
import EmojiPicker from "../EmojiPicker";
import Box from "@mui/material/Box";
import {
  sendNewMediaMessage,
  sendNewMediaRoomMessage,
  sendTextMessage,
  sendRoomTextMessage,
} from "../../api/Axios";
import {
  sendMediaMessage,
  sendRoomMediaMessage,
} from "../../redux/appReducer/actions";
import { authUser } from "../../redux/appReducer/selectors";
import { useTheme } from "@mui/material/styles";

const ChatFooter = ({ receiver }) => {
  const [message, setMessage] = useState("");
  const sender = useSelector(authUser);

  const dispatch = useDispatch();
  const theme = useTheme();

  const onPickEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const onSendMessage = () => {
    if (message) {
      if (receiver.room_name) {
        dispatch(sendRoomTextMessage(sender, receiver, message));
      }
      if (receiver.first_name) {
        dispatch(sendTextMessage(sender, receiver, message));
      }
      setMessage("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (receiver.first_name) {
            dispatch(
              sendNewMediaMessage(
                receiver.id,
                event.target.result,
                file.name,
                URL.createObjectURL(file)
              )
            );
          } else if (receiver.room_name) {
            dispatch(
              sendNewMediaRoomMessage(
                receiver.room_name,
                event.target.result,
                file.name,
                URL.createObjectURL(file)
              )
            );
          }
        };
        reader.readAsDataURL(file);
        const fileData = {
          preview: URL.createObjectURL(file),
          name: file.name,
          ...file,
          metaData: { type: file.type, size: file.size },
        };
        if (receiver.first_name) {
          dispatch(sendMediaMessage(fileData));
        } else {
          dispatch(sendRoomMediaMessage(fileData));
        }
      });
    },
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && message) {
      if (receiver.room_name) {
        dispatch(sendRoomTextMessage(sender, receiver, message));
      }
      if (receiver.first_name) {
        dispatch(sendTextMessage(sender, receiver, message));
      }
      event.preventDefault();
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.chatFooter,
        padding: theme.spacing(1.75, 2),
        display: "flex",
        alignItems: "center",
        marginTop: "auto",
        bottom: 0,
      }}
    >
      <input {...getInputProps()} />
      <IconButton
        sx={{ padding: theme.spacing(1.25), color: theme.palette.text.primary }}
        {...getRootProps()}
      >
        <AttachFileIcon />
      </IconButton>
      <CustomTextInput
        id="chat-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Shift ⇧ + Enter ↵ to add a line break."
        variant="outlined"
        multiline
        sx={{
          flex: 1,
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
        }}
      />
      <Box sx={{ marginRight: theme.spacing(4), marginLeft: 0 }}>
        <EmojiPicker onPickEmoji={onPickEmoji} />
      </Box>
      <IconButton
        sx={{ padding: theme.spacing(1.25), color: theme.palette.primary.main }}
        onClick={onSendMessage}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatFooter;
