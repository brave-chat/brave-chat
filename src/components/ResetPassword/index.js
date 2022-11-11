import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ContentLoader from "../ContentLoader";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { resetPassword } from "../../api/Axios";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./style.css";

const ResetPassword = ({ open, onCloseDialog }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    if (!oldPassword) {
      setOldPasswordError("This field is required!");
    } else if (!newPassword) {
      setNewPasswordError("This field is required!");
    } else if (!confirmPassword) {
      setConfirmPasswordError("This field is required!");
    } else {
      dispatch(
        resetPassword(oldPassword, newPassword, confirmPassword, onCloseDialog)
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className="dialog-root">
      <DialogTitle className="dialog-title-root">
        Reset Your Password.
      </DialogTitle>
      <DialogContent dividers>
        {" "}
        <Box
          alignItems="left"
          justifyContent="space-between"
          mt={5}
          mb={3}
          ml={1}
        >
          <Box
            display="flex"
            alignItems="left"
            justifyContent="space-between"
            mt={5}
            mb={3}
            ml={1}
          >
            <AppTextInput
              fullWidth
              className="text-field-root"
              type={showOldPassword ? "text" : "password"}
              variant="outlined"
              label="Old Password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setOldPasswordError("");
              }}
              helperText={oldPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="old-password" edge="end" disabled>
                      <LockIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="left"
            justifyContent="space-between"
            mt={5}
            mb={3}
            ml={1}
          >
            <AppTextInput
              fullWidth
              className="text-field-root"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              label="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordError("");
              }}
              helperText={newPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowNewPassword(!showNewPassword);
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="new-password" edge="end" disabled>
                      <LockIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="left"
            justifyContent="space-between"
            mt={5}
            mb={3}
            ml={1}
          >
            {" "}
            <AppTextInput
              fullWidth
              className="text-field-root"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton
                      aria-label="confirm-password"
                      edge="end"
                      disabled
                    >
                      <LockIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <ContentLoader variant="info" />
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button onClick={onCloseDialog} color="secondary">
              Cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
