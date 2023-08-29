import React from "react";

const CustomImage = ({ alt, ...restProps }) => {
  const altValue = alt ? alt : "";
  return <img alt={altValue} {...restProps} />;
};

export default CustomImage;
