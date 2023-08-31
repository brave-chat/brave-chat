import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import AppTextInput from "../AppTextInput";
import { useTheme } from "@mui/material/styles";

const CustomPassword = ({ password, helperText, onChange, ...rest }) => {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const theme = useTheme();

  return (
    <Box mb={2} sx={{ marginBottom: theme.spacing(2) }}>
      <AppTextInput
        {...rest}
        type={passwordType}
        fullWidth
        onChange={onChange}
        defaultValue={password}
        helperText={helperText}
        margin="normal"
        variant="outlined"
        sx={{
          width: "100%",
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginTop: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.text.primary,
          color: theme.palette.text.primary,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePassword}
                edge="end"
                sx={{ cursor: "pointer" }}
              >
                {passwordType === "password" ? (
                  <VisibilityOffIcon
                    style={{ color: theme.palette.text.primary }}
                  />
                ) : (
                  <VisibilityIcon
                    style={{ color: theme.palette.text.primary }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),

          startAdornment: (
            <InputAdornment position="start" variant="standard">
              <IconButton
                aria-label="Password"
                edge="end"
                disabled
                sx={{ cursor: "not-allowed" }}
              >
                <LockIcon style={{ color: theme.palette.text.primary }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CustomPassword;
