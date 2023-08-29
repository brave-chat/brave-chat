import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ContentLoader from "../../ContentLoader";
import clsx from "clsx";
import "../style.css";

const UserStatus = ({
  anchorEl,
  userStatus,
  handleClose,
  statusColor,
  updateStatus,
}) => {
  return (
    <Menu
      className="menu-root"
      id="user-status-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        className={clsx("menu-item-root", {
          active: userStatus === "Online",
        })}
        onClick={() => updateStatus("Online")}
      >
        <Box
          className="menu-status-Dot"
          style={{ backgroundColor: "#8DCD03" }}
        />{" "}
        Online
      </MenuItem>
      <MenuItem
        className={clsx("menu-item-root", {
          active: userStatus === "Busy",
        })}
        onClick={() => updateStatus("Busy")}
      >
        <Box
          className="menu-status-Dot"
          style={{ backgroundColor: "#FF8C00" }}
        />
        Busy
      </MenuItem>
      <MenuItem
        className={clsx("menu-item-root", {
          active: userStatus === "Don't Disturb",
        })}
        onClick={() => updateStatus("Don't Disturb")}
      >
        <Box
          className="menu-status-Dot"
          style={{ backgroundColor: "#E00930" }}
        />
        Don't Disturb
      </MenuItem>
      <MenuItem
        className={clsx("menu-item-root", {
          active: userStatus === "Offline",
        })}
        onClick={() => updateStatus("Offline")}
      >
        <Box
          className="menu-status-Dot"
          style={{ backgroundColor: "#C1C1C1" }}
        />
        Offline
      </MenuItem>
      <ContentLoader variant="info" />
    </Menu>
  );
};

export default UserStatus;
