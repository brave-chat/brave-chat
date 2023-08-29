import React from "react";
import Box from "@mui/material/Box";
import "./style.css";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const NoRecordFound = ({ content, ...restProps }) => {
  const defaultMsg = "No results!";
  return (
    <Box p={4} className="no-records-root" {...restProps}>
      <Box className="no-records-root-inner" {...restProps}>
        <ManageSearchIcon style={{ fontSize: "80px" }} />
        <Box>{content || defaultMsg}</Box>
      </Box>
    </Box>
  );
};

export default NoRecordFound;
