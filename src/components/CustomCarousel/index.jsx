import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

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
        sx={{
          position: "relative",
          ".slick-dots": {
            left: 0,
            right: 0,
            zIndex: 2,
          },
          ".slick-prev": {
            left: "20px",
            backgroundColor: "#7c7c7c",
            border: "2px solid #7c7c7c",
            zIndex: 10,
            "&::before": {
              color: "rgba(0, 0, 0, 0.87)",
            },
          },
          ".slick-next": {
            right: "20px",
            color: "#7c7c7c",
          },
          ".slick-dots li, li button, li button::before": {
            width: "10px",
            height: "10px",
            lineHeight: "1",
          },
          ".slick-dots li button::before": {
            fontSize: "0px",
            content: '""',
            backgroundColor: "#7c7c7c",
            borderRadius: "50%",
            boxSizing: "border-box",
          },
          ".slick-dots li.slick-active button::before": {
            backgroundColor: "#333333",
          },
          ".outline .slick-dots li button::before": {
            backgroundColor: "transparent",
            border: "2px solid #7c7c7c",
          },
          "li.slick-active button::before": {
            backgroundColor: "transparent",
            borderColor: "#333333",
          },
        }}
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
