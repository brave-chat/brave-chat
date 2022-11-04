import React from "react";
import Grid from "@mui/material/Grid";

const GridContainer = ({ children, ...rest }) => {
  return (
    <Grid container spacing={6} {...rest}>
      {children}
    </Grid>
  );
};

export default GridContainer;
