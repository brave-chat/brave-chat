import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CustomAvatar from "../CustomAvatar";
import "../style.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { onUserSelect, setFavourite } from "../../redux/appReducer/actions";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import ProfileDetail from "../Sidebar/ProfileDetail";
import clsx from "clsx";

import Popover from "@mui/material/Popover";
const actions = [
  { label: "Delete Chat", slug: "delete" },
  { label: "User Profile", slug: "profile" },
];

const ContentHeader = ({ user }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [favouriteColor, setFavouriteColor] = React.useState("primary");
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;
  const divRef = React.useRef();

  useEffect(() => {
    //setFavouriteColor(user.favourite === "true" ? "primary" : "")
  }, [user]);

  const toggleButton = (event) => {
    event.preventDefault();
    //dispatch(setFavourite(user.favourite));
  };
  const onOptionItemClick = (item) => {
    if (item.slug === "delete") {
      dispatch(onUserSelect(null));
    }
    if (item.slug === "profile") {
      setAnchorEl(divRef.current);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getStatusColor = () => {
    switch (user.chat_status.toLowerCase()) {
      case "online":
        return "#8dcd03";
      case "busy":
        return "#ff8c00";
      case "offline":
        return "#c1c1c1";
      case "don't disturb":
        return "#e00930";
      default:
        return "#c1c1c1";
    }
  };
  return (
    <Box className="app-content-header" ref={divRef}>
      <IconButton
        className="back-btn"
        onClick={() => dispatch(onUserSelect(null))}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={{ xs: 4, md: 6 }}>
          <Box className="user-root">
            <CustomAvatar src={user.profile_picture} onClick={handleClick} />
            <Box className={clsx("user-info", "custom-user-info")}>
              <Typography className="user-title" component="h3" variant="h6">
                {user.first_name + " " + user.last_name}
              </Typography>
              <Typography className="user-sub-title" component="span">
                {user.bio.substring(0, 30) + "..."}
              </Typography>
            </Box>
          </Box>
          <ProfileDetail
            currentUser={false}
            user={user}
            userStatus={user.chat_status}
            setUserStatus={() => {}}
            statusColor={getStatusColor()}
          />
        </Box>
      </Popover>
      <Box display="flex" alignItems="center">
        <CustomAvatar
          color="random"
          src={user.profile_picture}
          alt={user.first_name}
        />
        <Box pl={4}>
          <Box display="flex" alignItems="center">
            <Typography className="title-root" component="div" variant="h5">
              {user.first_name}
            </Typography>
            <Button ml={2} onClick={toggleButton}>
              {favouriteColor ? (
                <FavoriteIcon
                  className="star-icon-root"
                  color={favouriteColor}
                />
              ) : (
                <FavoriteBorderIcon
                  className="star-icon-root"
                  color="primary"
                />
              )}
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              className="header-status-dot"
              backgroundColor={getStatusColor()}
            />
            <Box component="span" ml={1.5} fontSize={12} color="#fff">
              {user.chat_status}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ml="auto">
        <DropdownMenu
          TriggerComponent={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          items={actions}
          onItemClick={onOptionItemClick}
        />
      </Box>
    </Box>
  );
};

export default ContentHeader;
