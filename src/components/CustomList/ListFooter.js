import React from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import "./style.css";
import { CircularProgress } from "@mui/material";

const ListFooter = ({ loading, footerText }) => {
  return loading ? (
    <div className="list-footer-loader-root">
      <CircularProgress size={16} />
      <span className="ml-2">Loading...</span>
    </div>
  ) : (
    <div className={clsx("list-footer-root", "custom-list-footer")}>
      <p>{footerText}</p>
    </div>
  );
};

ListFooter.prototype = {
  loading: PropTypes.bool,
  footerText: PropTypes.string,
};

ListFooter.defaultProps = {
  loading: false,
};

export default ListFooter;
