import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box } from "@mui/material";
import "./style.css";

const MySwal = withReactContent(Swal);

const CustomSweetAlert = ({ content, variant, delay }) => {
  const sweetAlerts = (content, variant, delay) => {
    MySwal.fire({
      icon: variant,
      text: content,
      background: "black",
      color: "white",
      position: "top-end",
      toast: true,
      showCancelButton: false,
      showConfirmButton: false,
      timer: delay,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };
  return (
    <Box className="alert-box">{sweetAlerts(content, variant, delay)}</Box>
  );
};

export default CustomSweetAlert;
