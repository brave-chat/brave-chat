import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
//import { createTheme, ThemeProvider } from "@mui/material/styles";
import TypedText from "../TypedText";
import ParticlesBackground from "../ParticlesBackground";
import { Link } from "react-router-dom";
import "./style.css";

// const theme = createTheme({
//   palette: {
//     neutral: {
//       main: "#fff",
//       contrastText: "#fff",
//     },
//   },
// });

const LandingSection = () => {
  return (
    <div className="bg-landing-section">
      <div className="inner-bg-landing-section">
        <ParticlesBackground />
      </div>
      <div className="landing-container">
        <div className="landing-row">
          <div className="inner-landing-row">
            <Typography variant="h1" className="page-title">
              The <span>Open Source</span>
            </Typography>
            <Typography variant="h1" className="page-title">
              <span>Slack</span> Alternative
            </Typography>

            <Typography mt={2} variant="h5">
              Keep the conversation going by utilizing excellent tools
              centralized in one place, made by the People, For the People.
            </Typography>
            <Typography variant="h4" mt={2} color="#52a1fc">
              <TypedText
                strings={["Connect !", "Talk !", "Chat !", "In Real-Time !"]}
                startDelay={300}
                typeSpeed={50}
                backSpeed={50}
                backDelay={300}
                loop={true}
              />
            </Typography>
            <Stack direction="row" className="landing-buttons" spacing={2}>
              {/*<ThemeProvider theme={theme}>
                <Button variant="outlined" className="about-us" color="neutral">
                  About Us
                </Button>
              </ThemeProvider>*/}

              <Button
                variant="contained"
                className="lets-chat"
                endIcon={<TelegramIcon />}
              >
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  to="/login"
                >
                  Let's chat
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
