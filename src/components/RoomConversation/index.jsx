import React from "react";
import ReceivedMessageCell from "./ReceivedMessageCell";
import SentMessageCell from "./SentMessageCell";
import CustomList from "../CustomList";
import { Box, useTheme } from "@mui/material";
import TypingMessage from "./ReceivedMessageCell/TypingMessage";
import ScrollToBottom from "react-scroll-to-bottom";

const RoomConversation = ({ conversation, selectedRoom }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      <ScrollToBottom
        sx={{
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
        className="messages"
      >
        <CustomList
          sx={{
            width: { sm: "100vw", xs: "100vw", md: "100%" },
          }}
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
