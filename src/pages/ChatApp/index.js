import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import "../../components/style.css";
import ChatContainer from "../../components/ChatContainer";

const ChatApp = () => {
  return (
    <Box className="in-build-app-container">
      <Sidebar />
      <ChatContainer />
    </Box>
  );
};

export default ChatApp;
