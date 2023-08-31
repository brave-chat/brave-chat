import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import Popover from "@mui/material/Popover";
import ProfileDetail from "../ProfileDetail";
import { uploadProfilePicture } from "../../../api/Axios";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { onUpdateTheme } from "../../../redux/appReducer/actions";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { selectedTheme } from "../../../redux/appReducer/selectors";

const SidebarHeader = ({ user, searchText, setSearchText }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(user.chat_status);
  const themeMode = useSelector(selectedTheme);
  const theme = useTheme();

  const onToggleTheme = (event) => {
    event.preventDefault();
    dispatch(onUpdateTheme(themeMode === "light" ? "dark" : "light"));
  };

  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (file) => {
      dispatch(uploadProfilePicture(file));
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    if (!userStatus) {
      return "#c1c1c1";
    }
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
            {user.first_name}
          </Typography>
          <Typography className="user-sub-title" component="span">
            {user.bio ? user.bio : ""}
          </Typography>
        </Box>
        <IconButton
          onClick={onToggleTheme}
          sx={{
            top: theme.spacing(0.2),
            left: theme.spacing(6),
          }}
        >
          {theme.palette.mode === "light" ? (
            <Brightness7Icon
              sx={{ fontSize: 28, fontWeight: "bold", color: "common.white" }}
            />
          ) : (
            <Brightness4Icon
              sx={{ fontSize: 28, fontWeight: "bold", color: "common.white" }}
            />
          )}
        </IconButton>
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
        id={"user-popover"}
        open={Boolean(anchorEl)}
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
            <input {...getInputProps()} />
            <IconButton className="icon-btn-root" {...getRootProps()}>
              <CustomAvatar
                src={user.profile_picture ? user.profile_picture : ""}
              />
            </IconButton>
            <Box className={clsx("user-info", "custom-user-info")}>
              <Typography className="user-title" component="h3" variant="h6">
                {user.first_name}
              </Typography>
              <Typography className="user-sub-title" component="span">
                {user.bio ? user.bio.substring(0, 30) + "..." : ""}
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
