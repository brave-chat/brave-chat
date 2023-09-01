import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ContentLoader from "../../ContentLoader";
import { useTheme } from "@mui/material/styles";

const UserStatus = ({
  anchorEl,
  userStatus,
  handleClose,
  statusColor,
  updateStatus,
}) => {
  const theme = useTheme();

  return (
    <Menu
      sx={{
        ".menu-item-root": {
          cursor: "pointer",
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          padding: `${theme.spacing(2)} !important`,
          "&:hover": {
            backgroundColor: theme.palette.background.default,
          },
          "&.active": {
            color: theme.palette.text.primary,
          },
        },
      }}
      id="user-status-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => updateStatus("Online")}
        className={userStatus === "Online" ? "active" : ""}
        sx={{ backgroundColor: "#8DCD03" }}
      >
        <Box className="menu-status-Dot" sx={{ backgroundColor: "#8DCD03" }} />{" "}
        Online
      </MenuItem>
      <MenuItem
        onClick={() => updateStatus("Busy")}
        className={userStatus === "Busy" ? "active" : ""}
        sx={{ backgroundColor: "#FF8C00" }}
      >
        <Box className="menu-status-Dot" sx={{ backgroundColor: "#FF8C00" }} />
        Busy
      </MenuItem>
      <MenuItem
        onClick={() => updateStatus("Don't Disturb")}
        className={userStatus === "Don't Disturb" ? "active" : ""}
        sx={{ backgroundColor: "#E00930" }}
      >
        <Box className="menu-status-Dot" sx={{ backgroundColor: "#E00930" }} />
        Don't Disturb
      </MenuItem>
      <MenuItem
        onClick={() => updateStatus("Offline")}
        className={userStatus === "Offline" ? "active" : ""}
        sx={{ backgroundColor: "#C1C1C1" }}
      >
        <Box className="menu-status-Dot" sx={{ backgroundColor: "#C1C1C1" }} />
        Offline
      </MenuItem>
      <ContentLoader variant="info" />
    </Menu>
  );
};

export default UserStatus;
