import React from "react";
import { Box } from "@mui/material";
import "../style.css";
import clsx from "clsx";
import CustomAvatar from "../../CustomAvatar";

const TypingMessage = ({ currentUser }) => {
  return (
    <>
      <Box
        className={clsx(
          "chat-msg-item",
          "received-msg-item",
          "received-msg-type"
        )}
      >
        {/*<Box className="chat-avatar">
          <CustomAvatar src={currentUser.profile_pic} alt={currentUser.name} />
        </Box>
        <Box className="chat-msg-content">
          <Box component="p">
            {currentUser.name}
            <Box component="span" color="#aaa">
              {" "}
              is typing...
            </Box>
          </Box>
        </Box>
      */}
      </Box>
    </>
  );
};

export default TypingMessage;
