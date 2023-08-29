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
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordValues, setShowPasswordValues] = useState({
    showOldPassword: true,
    showNewPassword: true,
    showConfirmPassword: true,
  });

  const [errorValues, setErrorValues] = useState({
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });

  const dispatch = useDispatch();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordValues;

    if (!oldPassword) {
      setErrorValues({
        ...errorValues,
        oldPasswordError: "This field is required!",
      });
    } else if (!newPassword) {
      setErrorValues({
        ...errorValues,
        newPasswordError: "This field is required!",
      });
    } else if (!confirmPassword) {
      setErrorValues({
        ...errorValues,
        confirmPasswordError: "This field is required!",
      });
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
              type={showPasswordValues.showOldPassword ? "text" : "password"}
              variant="outlined"
              label="Old Password"
              value={passwordValues.oldPassword}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  oldPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, oldPasswordError: "" });
              }}
              helperText={errorValues.oldPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPasswordValues({
                          ...showPasswordValues,
                          showOldPassword: !showPasswordValues.showOldPassword,
                        });
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPasswordValues.showOldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
              type={showPasswordValues.showNewPassword ? "text" : "password"}
              variant="outlined"
              label="New Password"
              value={passwordValues.newPassword}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  newPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, newPasswordError: "" });
              }}
              helperText={errorValues.newPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPasswordValues({
                          ...showPasswordValues,
                          showNewPassword: !showPasswordValues.showNewPassword,
                        });
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPasswordValues.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
              type={
                showPasswordValues.showConfirmPassword ? "text" : "password"
              }
              variant="outlined"
              label="Confirm Password"
              value={passwordValues.confirmPassword}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  confirmPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, confirmPasswordError: "" });
              }}
              helperText={errorValues.confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPasswordValues({
                          ...showPasswordValues,
                          showConfirmPassword:
                            !showPasswordValues.showConfirmPassword,
                        });
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPasswordValues.showConfirmPassword ? (
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
