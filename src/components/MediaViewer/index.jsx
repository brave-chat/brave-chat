import React, { useEffect, useState } from "react";
import CustomCarousel from "../CustomCarousel";
import CustomImage from "../CustomImage";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const renderRow = (data, index) => {
  return <CustomImage key={index} src={data["preview"]} alt={data["name"]} />;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MediaViewer = ({ position, medias, handleClose }) => {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (position > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [position]);

  return (
    <Dialog
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.main,
      }}
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box style={{ position: "relative" }}>
        <IconButton
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.text.primary,
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 999,
          }}
          onClick={handleClose}
        >
          <CancelIcon />
        </IconButton>
        {position >= 0 ? (
          <Box
            style={{
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "80vw",
            }}
          >
            <CustomCarousel
              settings={{
                dots: false,
                arrows: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
              }}
              style={{
                height: "100vh",
                width: "100%",
              }}
              slickgoto={position}
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
