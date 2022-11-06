import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { JWTAuth } from "../../api/Axios";
import ContentLoader from "../ContentLoader";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppTextInput from "../AppTextInput";
import MailIcon from "@mui/icons-material/Mail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { isValidEmail } from "../Helper";
import ParticlesBackground from "../ParticlesBackground";
import "./style.css";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorValues, setErrorValues] = useState({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleErrorChange = (prop) => (event) => {
    if (typeof event == "string")
      setErrorValues({ ...errorValues, [prop]: event });
    else setErrorValues({ ...errorValues, [prop]: event.target.value });
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

  const onClick = () => {
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
      sx={{ "& .MuiTextField-root": { mt: 3, mb: 3, ml: 1, width: "30ch" } }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      noValidate
      autoComplete="off"
      className="auth-wrap"
    >
      <ParticlesBackground />
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography
            component="div"
            pl={0}
            variant="h4"
            className="title-root"
          >
            LOGIN
          </Typography>
          <Box>
            <AppTextInput
              fullWidth
              className="text-field-root"
              variant="outlined"
              label="Email Address"
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
                      <MailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <AppTextInput
              fullWidth
              className="text-field-root"
              type={values.showPassword ? "text" : "password"}
              variant="outlined"
              label="Password"
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="Email" edge="end" disabled>
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
            mt={3}
            mb={3}
            ml={1}
          >
            <Button onClick={onClick} variant="contained" color="primary">
              {"Sign In"}
            </Button>
          </Box>
          <Typography className="text-acc" ml={1}>
            Don't have an account?
            <NavLink
              style={{
                textDecoration: "none",
                color: "#52a1fc",
                marginLeft: "8px",
              }}
              to="/signup"
            >
              Sign Up
            </NavLink>
          </Typography>
          <ContentLoader variant="info" />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
