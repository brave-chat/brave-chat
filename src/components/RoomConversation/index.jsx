import React from "react";
import ReceivedMessageCell from "./ReceivedMessageCell";
import SentMessageCell from "./SentMessageCell";
import CustomList from "../CustomList";
import { Box } from "@mui/material";
import "./style.css";
import TypingMessage from "./ReceivedMessageCell/TypingMessage";
import ScrollToBottom from "react-scroll-to-bottom";

const RoomConversation = ({ conversation, selectedRoom }) => {
  return (
    <Box className="chat-main-content">
      <ScrollToBottom className="messages">
        <CustomList
          data={conversation}
          renderRow={(data, index) => {
            if (data.type === "sent") {
              return (
                <div key={index}>
                  <SentMessageCell key={index} conversation={data} />
                </div>
              );
            }

            if (data.type === "received") {
              return (
                <div key={index}>
                  <ReceivedMessageCell
                    key={index}
                    conversation={data}
                    room={selectedRoom}
                  />
                </div>
              );
            }
          }}
        />
        <TypingMessage currentUser={selectedRoom} />
      </ScrollToBottom>
    </Box>
  );
};

export default RoomConversation;
