import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DialpadIcon from "@mui/icons-material/Dialpad";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import UserStatus from "../UserStatus";
import { useDispatch } from "react-redux";
import { JWTAuth, setCurrentUserStatus } from "../../../api/Axios";
import EditPersonalInformation from "../../EditInfo";
import ResetPassword from "../../ResetPassword";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const onSubmit = () => {
    dispatch(JWTAuth.onLogout());
    window.location.reload();
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const getStatusColor = () => {
    if (!userStatus) {
      return theme.palette.grey[400];
    }
    switch (userStatus.toLowerCase()) {
      case "online":
        return "#8DCD03";
      case "busy":
        return "#FF8C00";
      case "don't disturb":
        return "#E00930";
      default:
        return theme.palette.grey[400];
    }
  };

  return (
    <Box>
      <List
        dense
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
      >
        <ListItem
          sx={{
            cursor: currentUser ? "pointer" : "default",
            color: theme.palette.text.primary,
          }}
          onClick={currentUser ? handleClick : undefined}
        >
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <Box
              sx={{
                width: "16px",
                height: "16px",
                backgroundColor: getStatusColor(),
                borderRadius: "50%",
                color: theme.palette.text.primary,
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary={userStatus}
          />
        </ListItem>
      </List>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
          textTransform: "uppercase",
          fontSize: "10px",
          letterSpacing: "1.5px",
          color: theme.palette.text.primary,
        }}
      >
        Personal Information
      </Typography>
      {currentUser && (
        <ListItem sx={{ cursor: "pointer" }} onClick={handleEdit}>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <EditIcon />
          </ListItemIcon>
          <ListItemText sx={{ color: "text.primary" }} primary="Edit" />
        </ListItem>
      )}

      <List dense sx={{ paddingY: 0, color: theme.palette.text.primary }}>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="First Name"
            secondary={user.first_name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Last Name"
            secondary={user.first_name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Email Address"
            secondary={user.email}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "10px", marginRight: "20px" }}>
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Phone Number"
            secondary={user.phone_number}
          />
        </ListItem>
        {currentUser && (
          <ListItem sx={{ borderBottom: "none" }}>
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
