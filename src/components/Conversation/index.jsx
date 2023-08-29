import React, { useState, useEffect } from "react";
import ReceivedMessageCell from "./ReceivedMessageCell";
import SentMessageCell from "./SentMessageCell";
import CustomList from "../CustomList";
import {
  Box,
  InputBase,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import "./style.css";
import TypingMessage from "./ReceivedMessageCell/TypingMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import { VpnKey } from "@mui/icons-material";

import { setOpenAIAPIKey } from "../../api/Axios";

import { useDispatch } from "react-redux";

const Conversation = ({ conversation, selectedUser }) => {
  const [APIKey, setAPIKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenAIAPIKey(APIKey));
  }, [dispatch, APIKey]);
  return (
    <Box className="chat-main-content">
      {selectedUser["email"] === "chatgpt@brave-chat.net" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 700,
            minheight: 500,
            margin: "0 auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            OpenAI API Key
          </Typography>
          <InputBase
            sx={{
              padding: 1,
              borderRadius: 3,
              alignItems: "center",
              margin: "0 auto",
              justifyContent: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#1E1E1E",
              color: "#FFFFFF",
              border: "1px solid #333",
            }}
            placeholder={"OpenAI API KEY"}
            inputProps={{ "aria-label": "OpenAI API KEY" }}
            value={APIKey}
            onChange={(e) => setAPIKey(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconButton>
                  <VpnKey />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      )}
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
