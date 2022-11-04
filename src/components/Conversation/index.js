import React from "react";
import ReceivedMessageCell from "./ReceivedMessageCell";
import SentMessageCell from "./SentMessageCell";
import CustomList from "../CustomList";
import { Box } from "@mui/material";
import "./style.css";
import TypingMessage from "./ReceivedMessageCell/TypingMessage";
import ScrollToBottom from "react-scroll-to-bottom";

const Conversation = ({ conversation, selectedUser }) => {
  return (
    <Box className="chat-main-content">
      <ScrollToBottom className="messages">
        <CustomList
          data={conversation}
          renderRow={(conversation, index) => {
            if (conversation.type === "sent") {
              return (
                <div key={index}>
                  <SentMessageCell key={index} conversation={conversation} />
                </div>
              );
            }

            if (conversation.type === "received") {
              return (
                <div key={index}>
                  <ReceivedMessageCell
                    key={index}
                    conversation={conversation}
                    user={selectedUser}
                  />
                </div>
              );
            }
          }}
        />
        <TypingMessage currentUser={selectedUser} />
      </ScrollToBottom>
    </Box>
  );
};

export default Conversation;
