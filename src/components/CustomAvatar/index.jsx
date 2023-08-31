import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import { componentColors } from "../Helper";
import { Server } from "../../utils";

const colorOptions = [...componentColors, "random"];

const getRandomColor = () => {
  return colorOptions[Math.floor(Math.random() * 11)];
};

const CustomAvatar = React.forwardRef(
  (
    { src, alt, className, color, size, phCharLength, children, ...rest },
    ref
  ) => {
    const colorClass = color === "random" ? getRandomColor() : color;
    const sizeClass = size || "small"; // Default to "small" if no size is provided

    const classNames = {
      cursor: "pointer",
      primary: {
        color: "#020202",
        backgroundColor: "#fff",
      },
      secondary: {
        color: "rgba(0, 0, 0, 0.6)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      },
      amber: {
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "#f44336",
      },
      brown: {
        color: "#ffffff",
        backgroundColor: "#795548",
      },
      red: {
        color: "#ffffff",
        backgroundColor: "#f44336",
      },
      green: {
        color: "#ffffff",
        backgroundColor: "#4caf50",
      },
      blue: {
        color: "#ffffff",
        backgroundColor: "#2196f3",
      },
      yellow: {
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "#ffeb3b",
      },
      grey: {
        color: "#ffffff",
        backgroundColor: "#9e9e9e",
      },
      orange: {
        color: "#ff5722",
        backgroundColor: "#ff5722",
      },
      purple: {
        color: "#9c27b0",
        backgroundColor: "#9c27b0",
      },
      small: {
        height: "40px",
        width: "40px",
      },
      medium: {
        height: "48px",
        width: "48px",
      },
      large: {
        height: "56px",
        width: "56px",
      },
    };

    const placeHolderChar =
      alt && phCharLength > 0
        ? alt.substr(0, phCharLength).toUpperCase()
        : null;

    src = `${Server.endpoint}/profile/${src}`;

    return (
      <Avatar
        ref={ref}
        sx={{
          ...classNames[colorClass],
          ...classNames[sizeClass],
          cursor: "pointer",
        }}
        src={src}
        alt={alt}
        {...rest}
      >
        {!src && !children && alt ? placeHolderChar : children}
      </Avatar>
    );
  }
);

CustomAvatar.propTypes = {
  color: PropTypes.oneOf(colorOptions),
  phCharLength: PropTypes.number,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large"]),
    PropTypes.number,
  ]),
};

CustomAvatar.defaultProps = {
  color: "grey",
  phCharLength: 1,
  size: "medium",
};

export default CustomAvatar;
