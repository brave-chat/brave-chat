import { useTheme } from "@mui/material/styles";
import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
import TypedText from "../TypedText";
import ParticlesBackground from "../ParticlesBackground";
import { Link } from "react-router-dom";
import "./style.css";

const LandingSection = () => {
  const theme = useTheme();
  return (
    <div className="bg-landing-section">
      <div className="inner-bg-landing-section">
        <ParticlesBackground />
      </div>
      <div className="landing-container">
        <div className="landing-row">
          <div className="inner-landing-row">
            <Typography
              variant="h1"
              className="page-title"
              sx={{ color: theme.palette.text.primary }}
            >
              The <span>Open Source</span>
            </Typography>
            <Typography
              variant="h1"
              className="page-title"
              sx={{ color: theme.palette.text.primary }}
            >
              <span>Slack</span> Alternative
            </Typography>

            <Typography
              mt={2}
              variant="h5"
              sx={{ color: theme.palette.text.primary }}
            >
              Keep the conversation going by utilizing excellent tools
              centralized in one place, made by the People, for the People.
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
              <Button
                variant="contained"
                className="lets-chat"
                component={Link}
                sx={{ textDecoration: "none", color: "#fff" }}
                endIcon={<TelegramIcon />}
                to="/login"
              >
                Let's chat
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
