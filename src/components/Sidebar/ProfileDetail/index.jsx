import React from "react";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DialpadIcon from "@mui/icons-material/Dialpad";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import clsx from "clsx";
import UserStatus from "../UserStatus";
import { useDispatch } from "react-redux";
import { JWTAuth, setCurrentUserStatus } from "../../../api/Axios";
import EditPersonalInformation from "../../EditInfo";
import ResetPassword from "../../ResetPassword";
import "../style.css";

const ProfileDetail = ({
  currentUser,
  user,
  userStatus,
  statusColor,
  setUserStatus,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClose = () => {
    setEdit(false);
  };
  const handleShowPasswordDialog = () => {
    setShowPasswordDialog(false);
  };
  const onResetSubmit = () => {
    setShowPasswordDialog(true);
  };

  const updateStatus = (status) => {
    setAnchorEl(null);
    if (currentUser) {
      setUserStatus(status);
      dispatch(setCurrentUserStatus(status));
    }
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(JWTAuth.onLogout());
    window.location.reload();
  };
  const handleEdit = () => {
    setEdit(true);
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
    <Box>
      <List dense className="profile-list-title">
        <ListItem
          className="pointer"
          onClick={currentUser ? handleClick : undefined}
        >
          <ListItemIcon className="list-icon-root">
            <Box
              className="profile-status-dot"
              backgroundColor={getStatusColor()}
            />
          </ListItemIcon>
          <ListItemText className="text-color" primary={userStatus} />
        </ListItem>
      </List>
      <Typography className="profile-list-title">
        Personal Information
      </Typography>
      {currentUser && (
        <ListItem className="pointer">
          <ListItemIcon className="list-icon-root" onClick={handleEdit}>
            <EditIcon />
          </ListItemIcon>
          <ListItemText className="text-color" primary="Edit" />
        </ListItem>
      )}

      <List dense className={clsx("personal-list-root", "personal-list-root")}>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="First Name"
            secondary={user.first_name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Last Name"
            secondary={user.first_name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Email Address"
            secondary={user.email}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className="list-icon-root">
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText
            className="text-color"
            primary="Phone Number"
            secondary={user.phone_number}
          />
        </ListItem>
        {currentUser && (
          <ListItem className="sign-out-root">
            <Box ml={0}>
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={onResetSubmit}
                >
                  Reset Password
                </Button>
              </Box>
              <Box mt={3}>
                <Button variant="contained" color="error" onClick={onSubmit}>
                  Sign Out
                </Button>
              </Box>
            </Box>
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
      <EditPersonalInformation open={edit} onCloseDialog={handleEditClose} />
      <ResetPassword
        open={showPasswordDialog}
        onCloseDialog={handleShowPasswordDialog}
      />
    </Box>
  );
};

export default ProfileDetail;
