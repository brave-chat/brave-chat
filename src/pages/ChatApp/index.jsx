import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import ChatContainer from "../../components/ChatContainer";

const ChatApp = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#2d2b2b",
        color: "#fff",
        borderRadius: 4,
        flexDirection: "row",
        flexWrap: "nowrap",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <ChatContainer />
    </Box>
  );
};

export default ChatApp;
