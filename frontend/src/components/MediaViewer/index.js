import React, { useEffect, useState } from "react";
import CustomCarousel from "../CustomCarousel";
import CustomImage from "../CustomImage";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import "./style.css";

const renderRow = (data, index) => {
  if (data.metaData.type.startsWith("image")) {
    return <CustomImage key={index} src={data.preview} alt={data.name} />;
  } else {
    return (
      <Box className="embed-responsive">
        <iframe key={index} src={data.preview} title={data.name} />
      </Box>
    );
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MediaViewer = ({ position, medias, handleClose }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (position > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [position]);

  return (
    <Dialog
      className="dialog-root"
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box className="media-viewer-root">
        <IconButton className="cancel-btn" onClick={handleClose}>
          <CancelIcon />
        </IconButton>
        {position >= 0 ? (
          <Box className="carousel-root">
            <CustomCarousel
              settings={{
                dots: false,
                initialSlide: position,
                arrows: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
              }}
              slickGoTo={position}
              style={{ width: "100%" }}
              data={medias}
              renderRow={renderRow}
            />
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
};

export default MediaViewer;
