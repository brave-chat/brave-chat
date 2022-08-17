import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import "./style.css";
import AttachFileIcon from "@mui/icons-material/Attachment";

import CustomTextInput from "../CustomTextInput";

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    if (message) {
      // TODO: dispatch this event
      setMessage("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          preview: URL.createObjectURL(file),
          name: file.name,
          ...file,
          metaData: { type: file.type, size: file.size },
        };
      });
      // TODO: dispatch this event
    },
  });

  const handleKeyPress = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && !event.shiftKey && message) {
      // TODO: dispatch this event
      event.preventDefault();
      setMessage("");
    }
  };

  return (
    <div className="chat-footer-root">
      <input {...getInputProps()} />
      <IconButton className="icon-btn-root" {...getRootProps()}>
        <AttachFileIcon />
      </IconButton>
      <CustomTextInput
        id="chat-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type message..."
        variant="outlined"
        multiline
        className="text-field-root"
      />
      <IconButton className="icon-btn-root" onClick={onSendMessage}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatFooter;
