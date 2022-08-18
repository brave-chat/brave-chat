import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Avatar } from "@mui/material";
import { componentColors } from "../Helper";
import "./style.css";

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
    const sizeClass = "small";

    const classNames = clsx(
      "avatar-root",
      colorClass,
      "custom-avatar-size",
      sizeClass,
      className && className
    );

    const placeHolderChar =
      alt && phCharLength > 0
        ? alt.substr(0, phCharLength).toUpperCase()
        : null;

    return (
      <Avatar ref={ref} className={classNames} src={src} alt={alt} {...rest}>
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
