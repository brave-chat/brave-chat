import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextInput = ({
  type,
  name,
  id,
  fullWidth,
  size,
  value,
  onChange,
  helperText,
  variant,
  error,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      type={type}
      name={name}
      id={id || name}
      size={size}
      fullWidth={fullWidth}
      value={value}
      variant={variant}
      onChange={onChange}
      error={error || helperText !== ""}
      helperText={helperText}
    />
  );
};

CustomTextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.bool,
};

CustomTextInput.defaultProps = {
  type: "text",
  fullWidth: true,
  size: "small",
  error: false,
  helperText: "",
};

export default CustomTextInput;
