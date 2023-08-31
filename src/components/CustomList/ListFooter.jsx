import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, useTheme } from "@mui/material";

const ListFooter = ({ loading, footerText }) => {
  const theme = useTheme();

  return (
    <div
      sx={{
        padding: "10px",
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <div
          sx={{
            display: "flex",
            padding: "8px",
            justifyContent: "center",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            boxSizing: "border-box",
          }}
        >
          <CircularProgress size={16} />
          <span sx={{ marginLeft: "8px" }}>Loading...</span>
        </div>
      ) : (
        <p>{footerText}</p>
      )}
    </div>
  );
};

ListFooter.propTypes = {
  loading: PropTypes.bool,
  footerText: PropTypes.string,
};

ListFooter.defaultProps = {
  loading: false,
};

export default ListFooter;
