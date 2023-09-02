import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import ContentLoader from "../../components/ContentLoader";
import { useDispatch } from "react-redux";
import { onUpdateTheme } from "../../redux/appReducer/actions";
import { isValidEmail } from "../../components/Helper";
import AppTextInput from "../../components/AppTextInput";
import NavBar from "../../components/NavBar";
import ParticlesBackground from "../../components/ParticlesBackground";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [values, setValues] = useState({
    email: "",
  });

  const [errorValues, setErrorValues] = useState({
    emailError: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleErrorChange = (prop) => (event) => {
    if (typeof event === "string") {
      setErrorValues({ ...errorValues, [prop]: event });
    } else {
      setErrorValues({ ...errorValues, [prop]: event.target.value });
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    if (!isValidEmail(values.email)) {
      handleErrorChange("emailError")("Email address must be valid!");
    } else {
      // Implement your logic for password reset here
      console.log("Password reset logic here");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: theme.spacing(30),
        backgroundColor: theme.palette.background.default,
        "& .MuiTextField-root": {
          mt: theme.spacing(3),
          mb: theme.spacing(3),
          width: "35ch",
        },
      }}
      onSubmit={onClick}
    >
      <NavBar />
      <ParticlesBackground />
      <ContentLoader variant="info" />

      <Box
        sx={{
          textAlign: "center",
          mb: 4,
          position: "absolute",
          top: theme.spacing(13),
        }}
      >
        <NavLink to="/" underline="none" sx={{ display: "block" }}>
          {theme.palette.mode === "dark" ? (
            <img src="/logo.png" alt="Brave Chat" height="100" />
          ) : (
            <img src="/dark-logo.png" alt="Brave Chat" height="100" />
          )}
        </NavLink>
      </Box>

      <Box
        sx={{
          border: `2px solid ${theme.palette.primary.main}`,
          zIndex: 3,
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.primary,
          display: "flex",
          marginRight: theme.spacing(3),
          marginLeft: theme.spacing(3),
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.primary,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Typography
            component="div"
            pl={0}
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              marginBottom: theme.spacing(2),
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            RESET PASSWORD
          </Typography>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                ml: theme.spacing(1),
                mb: -2,
              }}
            >
              Email Address
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </Typography>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.email}
              onChange={(e) => {
                handleChange("email")(e);
                handleErrorChange("emailError")("");
              }}
              helperText={errorValues.emailError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="Email" edge="end" disabled>
                      <MailIcon style={{ color: theme.palette.text.primary }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                ml: theme.spacing(1),
                mr: theme.spacing(1),
                mt: theme.spacing(1),
                mb: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.text.primary,
              }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="left"
            justifyContent="space-between"
            mb={2}
            ml={1}
          >
            <Button type="submit" variant="contained" fullWidth color="primary">
              {"Reset Password"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ mt: 3, textAlign: "center", color: theme.palette.text.primary }}
      >
        <Typography variant="body2">
          Remember It?{" "}
          <NavLink
            style={{
              textDecoration: "none",
              fontWeight: "medium",
              color: theme.palette.primary.main,
            }}
            to="/login"
          >
            Sign In
          </NavLink>
        </Typography>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} - Brave Chat. Crafted with ❤️ by
          friends.
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
