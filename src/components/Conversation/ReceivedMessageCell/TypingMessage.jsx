import React from "react";
import { Box } from "@mui/material";

const TypingMessage = ({ currentUser }) => {
  return (
    <>
      <Box
        sx={{
          padding: "0px 20px",
          display: "flex",
          alignItems: "flex-end",
          marginTop: "30px",
          marginBottom: "70px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px 8px 0 8px",
          maxWidth: "600px",
          fontSize: "16px",
          marginLeft: "10px",
        }}
      ></Box>
    </>
  );
};

export default TypingMessage;
