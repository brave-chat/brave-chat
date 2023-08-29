import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
const PageLoader = () => {
  return (
    <Box className="circular-progress-root">
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
