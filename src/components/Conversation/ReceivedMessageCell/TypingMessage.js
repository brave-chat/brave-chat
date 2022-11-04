import React from "react";
import { Box } from "@mui/material";
import "../style.css";
import clsx from "clsx";

const TypingMessage = ({ currentUser }) => {
  return (
    <>
      <Box
        className={clsx(
          "chat-msg-item",
          "received-msg-item",
          "received-msg-type"
        )}
      ></Box>
    </>
  );
};

export default TypingMessage;
