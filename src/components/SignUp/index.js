import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { JWTAuth } from "../../api/Axios";
import AppTextInput from "../AppTextInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { isValidEmail } from "../Helper";
import ParticlesBackground from "../ParticlesBackground";
import ContentLoader from "../ContentLoader";
import "../SignIn/style.css";

const SignUp = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorValues, setErrorValues] = useState({
    firstNameError: "",
    lastNameError: "",
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
    if (!values.firstName) {
      handleErrorChange("firstNameError")("First Name is required!");
    } else if (!values.lastName) {
      handleErrorChange("lastNameError")("Last Name is required!");
    } else if (!values.email) {
      handleErrorChange("emailError")("Email is required!");
    } else if (!isValidEmail(values.email)) {
      handleErrorChange("emailError")("Email address must be valid!");
    } else if (!values.password) {
      handleErrorChange("passwordError")("Password is required!");
    } else {
      dispatch(
        JWTAuth.onRegister({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
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
      {/*<ParticlesBackground />*/}
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography component="div" variant="h4" className="title-root">
            REGISTER
          </Typography>
          <Box
            display="flex"
            width="31ch"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
          >
            <AppTextInput
              fullWidth
              className="text-field-root "
              variant="outlined"
              label="First Name"
              value={values.firstName}
              onChange={(e) => {
                handleChange("firstName")(e);
                handleErrorChange("firstNameError")("");
              }}
              helperText={errorValues.firstNameError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="First Name" edge="end" disabled>
                      <PermIdentityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <AppTextInput
              fullWidth
              className="text-field-root full-width-text-box"
              variant="outlined"
              label="Last Name"
              value={values.lastName}
              onChange={(e) => {
                handleChange("lastName")(e);
                handleErrorChange("lastNameError")("");
              }}
              helperText={errorValues.lastNameError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" variant="standard">
                    <IconButton aria-label="Last Name" edge="end" disabled>
                      <PersonIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            xs={{
              "& .MuiTextField-root": { mt: 3, mb: 3, ml: 7, width: "39ch" },
            }}
            md={{
              "& .MuiTextField-root": { mt: 3, mb: 3, ml: 7, width: "39ch" },
            }}
          >
            <AppTextInput
              fullWidth
              variant="outlined"
              className="text-field-root"
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
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            mb={3}
            ml={1}
          >
            <Button onClick={onClick} variant="contained" color="primary">
              {"Sign Up"}
            </Button>
          </Box>

          <Typography ml={1} mb={1}>
            Have an account?
            <NavLink
              style={{
                textDecoration: "none",
                color: "#52a1fc",
                marginLeft: "8px",
              }}
              to="/login"
            >
              Sign In
            </NavLink>
          </Typography>
        </Box>
        <ContentLoader />
      </Box>
    </Box>
  );
};

export default SignUp;
