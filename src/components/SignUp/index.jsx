import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { JWTAuth } from "../../api/Axios";
import AppTextInput from "../AppTextInput";
import ContentLoader from "../ContentLoader";
import ParticlesBackground from "../ParticlesBackground";
import { isValidEmail } from "../Helper";

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    agreeToTerms: false,
  });

  const [errorValues, setErrorValues] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });

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

  const onClick = (event) => {
    event.preventDefault();
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
      <ContentLoader variant="info" />
      <Box
        sx={{ textAlign: "center", mb: 4, position: "absolute", top: "12%" }}
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
            REGISTER
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              ml: theme.spacing(1),
              mb: -2,
            }}
          >
            Full Name
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </Typography>
          <Box
            display="flex"
            width="36.5ch"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
          >
            <AppTextInput
              fullWidth
              className="text-field-root"
              variant="outlined"
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
                      <PermIdentityIcon
                        style={{ color: theme.palette.text.primary }}
                      />
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
            <AppTextInput
              fullWidth
              className="text-field-root full-width-text-box"
              variant="outlined"
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
                      <PersonIcon
                        style={{ color: theme.palette.text.primary }}
                      />
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
          <Box
            xs={{
              "& .MuiTextField-root": { mt: 3, mb: 3, ml: 7, width: "39ch" },
            }}
            md={{
              "& .MuiTextField-root": { mt: 3, mb: 3, ml: 7, width: "39ch" },
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary, ml: 1, mb: -2 }}
            >
              Email Address
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </Typography>
            <AppTextInput
              fullWidth
              variant="outlined"
              className="text-field-root"
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
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.text.primary,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary, ml: 1, mb: -2 }}
            >
              Password
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </Typography>
            <AppTextInput
              fullWidth
              className="text-field-root"
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
                    <IconButton aria-label="Email" edge="end" disabled>
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
                  checked={values.agreeToTerms}
                  onChange={(e) =>
                    setValues({ ...values, agreeToTerms: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Agree to Terms and Service"
              sx={{ color: theme.palette.text.primary, marginTop: "-10px" }}
            />
          </Box>

          <Box
            display="flex"
            alignItems="left"
            justifyContent="space-between"
            mb={3}
            ml={1}
            mr={1}
            mt={1}
          >
            <Button type="submit" variant="contained" fullWidth color="primary">
              {"Sign Up"}
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
          Have an account?
          <NavLink
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
              marginLeft: theme.spacing(1),
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

export default SignUp;
