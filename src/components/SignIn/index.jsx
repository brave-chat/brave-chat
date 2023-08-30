import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector, useDispatch } from "react-redux";
import { JWTAuth } from "../../api/Axios";
import AppTextInput from "../AppTextInput";
import ContentLoader from "../ContentLoader";
import ParticlesBackground from "../ParticlesBackground";
import { isValidEmail } from "../Helper";

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });

  const [errorValues, setErrorValues] = useState({
    emailError: "",
    passwordError: "",
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClick = (event) => {
    event.preventDefault();
    if (!isValidEmail(values.email)) {
      handleErrorChange("emailError")("Email address must be valid!");
    } else if (!values.password) {
      handleErrorChange("passwordError")("Password is required!");
    } else {
      dispatch(
        JWTAuth.onLogin({ email: values.email, password: values.password })
      );
    }
  };

  return (
    <Box
      component="form"
      sx={{
        marginBottom: 0,
        paddingBottom: 0,
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
            LOGIN
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
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                ml: theme.spacing(1),
                mb: -2,
              }}
            >
              Password
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </Typography>
            <AppTextInput
              fullWidth
              type={values.showPassword ? "text" : "password"}
              variant="outlined"
              value={values.password}
              onChange={(e) => {
                handleChange("password")(e);
                handleErrorChange("passwordError")("");
              }}
              helperText={errorValues.passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOff
                          style={{ color: theme.palette.text.primary }}
                        />
                      ) : (
                        <Visibility
                          style={{ color: theme.palette.text.primary }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="Password" edge="end" disabled>
                      <LockIcon style={{ color: theme.palette.text.primary }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                ml: theme.spacing(1),
                mr: theme.spacing(1),
                mt: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.text.primary,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              mr: theme.spacing(1),
              color: theme.palette.text.primary,
              textAlign: "right",
            }}
          >
            <NavLink
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
              to="/forgot-password"
            >
              Forgot Password?
            </NavLink>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: theme.spacing(1),
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberMe}
                  onChange={(e) =>
                    setValues({ ...values, rememberMe: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Remember me"
              sx={{ color: theme.palette.text.primary }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Agree to Terms and Service"
              sx={{ color: theme.palette.text.primary, marginTop: "-10px" }}
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
              {"Sign In"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          color: theme.palette.text.primary,
          zIndex: 1024,
        }}
      >
        <Typography variant="body2">
          Don't have an account?
          <NavLink
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
              marginLeft: theme.spacing(1),
            }}
            to="/signup"
          >
            Sign Up
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

export default SignIn;
