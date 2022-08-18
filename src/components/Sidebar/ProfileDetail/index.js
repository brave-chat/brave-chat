import React from "react";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import FlagIcon from "@mui/icons-material/Flag";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import DialpadIcon from "@mui/icons-material/Dialpad";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import clsx from "clsx";
import UserStatus from "../UserStatus";
import "../style.css";

const ProfileDetail = ({
  currentUser,
  user,
  userStatus,
  statusColor,
  setUserStatus,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = (status) => {
    setAnchorEl(null);
    if (currentUser) {
      setUserStatus(status);
    }
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    // dispatch logout
  }
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

  return (
    <Box>
      <List dense className="profile-list-title">
        <ListItem className="pointer" onClick={currentUser ? handleClick: undefined}>
          <ListItemIcon className="list-icon-root">
            <Box
              className="profile-status-dot"
              backgroundColor={getStatusColor()}
            />
          </ListItemIcon>
          <ListItemText className="text-color" primary={userStatus} />
        </ListItem>
        <ListItem className="pointer">
          <ListItemIcon className="list-icon-root">
            <FlagIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary={user.profile_status.substring(0, 20) + "..."}
          />
          <ListItemSecondaryAction className="list-item-action">
            <IconButton edge="end" aria-label="delete">
              {currentUser && <CloseIcon color="#000" />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className="pointer">
          <ListItemIcon className="list-icon-root">
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText className="text-color" primary="My Account" />
        </ListItem>
        <ListItem className="pointer">
          <ListItemIcon className="list-icon-root">
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText className="text-color" primary="Settings" />
        </ListItem>
      </List>

      <Typography className="profile-list-title">Personal Detail</Typography>

      <List dense className={clsx("personal-list-root", "personal-list-root")}>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Name"
            secondary={user.name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Username"
            secondary={user.name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Email Address"
            secondary={user.name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Phone Number"
            secondary={user.name}
          />
        </ListItem>
        {currentUser && (
          <ListItem className="sign-out-root">
            <Button variant="contained" color="error" onClick={onSubmit}>
              Sign Out
            </Button>
          </ListItem>
        )}
      </List>
      <UserStatus
        anchorEl={anchorEl}
        handleClose={handleClose}
        updateStatus={updateStatus}
        statusColor={getStatusColor()}
        userStatus={userStatus}
      />
    </Box>
  );
};

export default ProfileDetail;
