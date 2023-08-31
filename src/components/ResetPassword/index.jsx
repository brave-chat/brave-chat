import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
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
import CustomPassword from "../CustomPassword";

const ResetPassword = ({ open, onCloseDialog }) => {
  const theme = useTheme();
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorValues, setErrorValues] = useState({
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
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
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle
        sx={{
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "grey",
          border: "3px solid blue",
        }}
      >
        Reset Your Password.
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={onSubmit}>
          <Box
            alignItems="flex-start"
            justifyContent="space-between"
            mt={5}
            mb={3}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary, mb: -1 }}
            >
              Old Password
              <span
                style={{ color: "red", marginLeft: "5px" }}
                aria-hidden="true"
              >
                *
              </span>
            </Typography>
            <CustomPassword
              fullWidth
              password={passwordValues.oldPassword}
              helperText={errorValues.oldPasswordError}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  oldPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, oldPasswordError: "" });
              }}
            />
          </Box>
          <Box
            alignItems="flex-start"
            justifyContent="space-between"
            mt={0}
            mb={3}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary, mb: -1 }}
            >
              New Password
              <span
                style={{ color: "red", marginLeft: "5px" }}
                aria-hidden="true"
              >
                *
              </span>
            </Typography>
            <CustomPassword
              fullWidth
              password={passwordValues.newPassword}
              helperText={errorValues.newPasswordError}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  newPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, newPasswordError: "" });
              }}
            />
          </Box>
          <Box
            alignItems="flex-start"
            justifyContent="space-between"
            mt={0}
            mb={3}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary, mb: -1 }}
            >
              Confirm Password
              <span
                style={{ color: "red", marginLeft: "5px" }}
                aria-hidden="true"
              >
                *
              </span>
            </Typography>
            <CustomPassword
              fullWidth
              password={passwordValues.confirmPassword}
              helperText={errorValues.confirmPasswordError}
              onChange={(e) => {
                setPasswordValues({
                  ...passwordValues,
                  confirmPassword: e.target.value,
                });
                setErrorValues({ ...errorValues, confirmPasswordError: "" });
              }}
            />
          </Box>
          <ContentLoader variant="info" />
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button onClick={onCloseDialog} color="secondary">
              Cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" type="submit">
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
