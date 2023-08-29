import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./style.css";

const getCarouselSetting = (settings) => {
  return {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    ...settings,
  };
};

const CustomCarousel = ({ data, renderRow, settings, ...rest }) => {
  const carouselSettings = getCarouselSetting(settings);
  return (
    <Box {...rest}>
      <Slider
        className={clsx("slider-root", "bottom", { outline: true })}
        {...carouselSettings}
      >
        {data.map === "function"
          ? data.map((item, index) => renderRow(item, index))
          : renderRow(data, 0)}
      </Slider>
    </Box>
  );
};

export default React.memo(CustomCarousel);

CustomCarousel.propTypes = {
  data: PropTypes.isRequired,
  renderRow: PropTypes.func,
  settings: PropTypes.object,
};
