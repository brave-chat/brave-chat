import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ParticlesBackground from "../../components/ParticlesBackground";

const PageNotFound = () => {
  const theme = useTheme();

  return (
    <>
      <NavBar />
      <ParticlesBackground />
      <Container
        sx={{
          backgroundColor: theme.palette.background.main,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="main"
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "90px", sm: "210px" },
              fontWeight: 900,
              textShadow: "4px 4px 0 #fff, 6px 6px 0 #343a40",
              lineHeight: "210px",
              color: theme.palette.info.main,
              marginBottom: { xs: "-50px", sm: "-20px" },
            }}
          >
            404
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "30px", sm: "55px" },
              textTransform: "uppercase",
              color: theme.palette.text.primary,
            }}
          >
            PAGE NOT FOUND!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            YOU SEEM TO BE TRYING TO FIND YOUR WAY HOME!
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.info.main,
              color: theme.palette.common.white,
              textDecoration: "none",
              borderRadius: theme.shape.borderRadius,
              padding: "10px 20px",
              marginTop: "30px",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              "&:hover, &:focus": {
                backgroundColor: theme.palette.info.dark,
              },
            }}
          >
            Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PageNotFound;
