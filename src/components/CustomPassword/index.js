import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AppTextInput from "../AppTextInput"
import "./style.css";

const CustomPasswordInput = ({ password, setPassword, helperText, setPasswordError }) => {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Box mb={2} className="div-password-field">
      <AppTextInput
        label="password"
        type={passwordType}
        fullWidth
        onChange={(e) => {
          setPassword(e.target.value)
          setPasswordError("");
        }}
        defaultValue={password}
        helperText={helperText}
        size={""}
        margin="normal"
        variant="outlined"
        className="text-field-root"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             <IconButton aria-label="toggle password" className="toggle-button-password" edge="end" onClick={togglePassword}>
                {passwordType === "password" ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

    </Box>
  );
};
export default CustomPasswordInput;
