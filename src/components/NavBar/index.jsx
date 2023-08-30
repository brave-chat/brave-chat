import React from "react";
import Logo from "./Logo";
import "./style.css";
import GitHubButton from "react-github-btn";
import { selectedTheme } from "../../redux/appReducer/selectors";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { onUpdateTheme } from "../../redux/appReducer/actions";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
const NavBar = () => {
  const themeMode = useSelector(selectedTheme);
  const theme = useTheme();
  const dispatch = useDispatch();

  const onToggleTheme = (event) => {
    event.preventDefault();
    dispatch(onUpdateTheme(themeMode === "light" ? "dark" : "light"));
  };

  return (
    <header className="landing-header">
      <div className="inner-container">
        <nav className="inner-nav-bar">
          <Box sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
            <Logo logoSource={"./logo.png"} />
          </Box>
          <ul className="nav-bar-ul">
            <li className="nav-item">
              <div className="nav-github-btn">
                <GitHubButton
                  data-color-scheme="dark: dark;"
                  href="https://github.com/brave-chat/brave-chat"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star us on GitHub"
                >
                  Star us on GitHub
                </GitHubButton>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-github-btn">
                {theme.palette.mode === "light" ? (
                  <Box
                    element="span"
                    sx={{
                      position: "absolute",
                      color: "common.white",
                      right: theme.spacing(32),
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Light
                  </Box>
                ) : (
                  <Box
                    element="span"
                    sx={{
                      position: "absolute",
                      color: "common.white",
                      right: theme.spacing(32),
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Dark
                  </Box>
                )}
                <IconButton
                  onClick={onToggleTheme}
                  sx={{
                    position: "absolute",
                    top: theme.spacing(-0.7),
                    right: theme.spacing(25),
                    zIndex: 999,
                  }}
                >
                  {theme.palette.mode === "light" ? (
                    <Brightness7Icon sx={{ color: "common.white" }} />
                  ) : (
                    <Brightness4Icon sx={{ color: "common.white" }} />
                  )}
                </IconButton>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
