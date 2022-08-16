import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./style.css";

const CustomPasswordInput = ({ password, setPassword }) => {
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
      <TextField
        type={passwordType}
        label="password"
        fullWidth
        onChange={(event) => setPassword(event.target.value)}
        defaultValue={password}
        margin="normal"
        variant="outlined"
        className="text-field-root"
      />
      <Button
        variant="none"
        onClick={togglePassword}
        className="toggle-button-password"
      >
        {passwordType === "password" ? (
          <VisibilityOffIcon />
        ) : (
          <VisibilityIcon />
        )}
      </Button>
    </Box>
  );
};
export default CustomPasswordInput;
