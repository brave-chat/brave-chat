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
  useTheme,
} from "@mui/material";
import TypingMessage from "./ReceivedMessageCell/TypingMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import { VpnKey } from "@mui/icons-material";
import "./style.css";
import { setOpenAIAPIKey } from "../../api/Axios";

import { useDispatch } from "react-redux";

const Conversation = ({ conversation, selectedUser }) => {
  const [APIKey, setAPIKey] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setOpenAIAPIKey(APIKey));
  }, [dispatch, APIKey]);

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      {selectedUser["email"] === "chatgpt@brave-chat.net" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { sm: "100vw", xs: "100vw", md: "300px" },
            margin: "0 auto",
            padding: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
          >
            Enter your OpenAI key and send a message
          </Typography>
          <InputBase
            sx={{
              padding: theme.spacing(1),
              borderRadius: theme.shape.borderRadius,
              alignItems: "center",
              margin: "0 auto",
              justifyContent: "center",
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
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
          sx={{
            width: { sm: "100vw", xs: "100vw", md: "100%" },
          }}
          data={conversation}
          renderRow={(conversation, index) => {
            if (conversation.type === "sent") {
              return (
                <SentMessageCell key={index} conversation={conversation} />
              );
            }

            if (conversation.type === "received") {
              return (
                <ReceivedMessageCell
                  key={index}
                  conversation={conversation}
                  user={selectedUser}
                />
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
