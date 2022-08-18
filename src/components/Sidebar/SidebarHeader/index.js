import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import Popover from "@mui/material/Popover";
import ProfileDetail from "../ProfileDetail";

const SidebarHeader = ({ user, searchText, setSearchText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(user.status);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    switch (userStatus.toLowerCase()) {
      case "online":
        return "#8DCD03";
      case "busy":
        return "#FF8C00";
      case "don't disturb":
        return "#E00930";
      default:
        return "#C1C1C1";
    }
  };
  const open = Boolean(anchorEl);
  const id = "user-popover";

  return (
    <Box className="side-bar-header-root">
      <Box className="user-root">
        <Box onClick={handleClick} className="header-avatar-root">
          <CustomAvatar src={user.profile_picture} />
          <Box
            className="header-status-dot"
            backgroundColor={getStatusColor()}
          />
        </Box>
        <Box className={clsx("user-info", "custom-user-info")}>
          <Typography className="user-title" component="h3" variant="h6">
            {user.name}
          </Typography>
          <Typography className="user-sub-title" component="span">
            {user.profile_status}
          </Typography>
        </Box>
      </Box>
      <Box className="search-root">
        <InputBase
          placeholder={"Search here..."}
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchIcon />
      </Box>
      <Popover
        id={id}
        open={open}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={{ xs: 4, md: 6 }}>
          <Box className="user-root">
            <CustomAvatar src={user.profile_picture} onClick={handleClick} />
            <Box className={clsx("user-info", "custom-user-info")}>
              <Typography className="user-title" component="h3" variant="h6">
                {user.name}
              </Typography>
              <Typography className="user-sub-title" component="span">
                {user.profile_status.substring(0, 30) + "..."}
              </Typography>
            </Box>
          </Box>
          <ProfileDetail
            currentUser="true"
            user={user}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            statusColor={getStatusColor()}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default SidebarHeader;
