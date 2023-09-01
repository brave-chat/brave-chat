import React from "react";
import Box from "@mui/material/Box";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import { useTheme } from "@mui/material/styles";

const NoRecordFound = ({ content, ...restProps }) => {
  const theme = useTheme();
  const defaultMsg = "No results!";
  return (
    <Box
      p={4}
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.main,
        height: "100%",
      }}
      {...restProps}
    >
      <Box
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: "50px",
        }}
        {...restProps}
      >
        <ManageSearchIcon style={{ fontSize: "80px" }} />
        <Box>{content || defaultMsg}</Box>
      </Box>
    </Box>
  );
};

export default NoRecordFound;
