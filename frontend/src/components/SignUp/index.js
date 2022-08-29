import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContentLoader from "../ContentLoader";
import GridContainer from "../GridContainer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { JWTAuth } from "../../api/Axios";
import CustomPasswordInput from "../CustomPassword";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { isValidEmail } from "../Helper";
import "../SignIn/style.css";

const SignUp = () => {
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!firstName) {
      setFirstNameError("First Name is required!");
    } else if (!lastName) {
      setLastNameError("Last Name is required!");
    } else if (!email) {
      setEmailError("Email is required!");
    } else if (!isValidEmail(email)) {
      setEmailError("Email address must be valid!");
    } else if (!password) {
      setPasswordError("Password is required!");
    } else {
      dispatch(JWTAuth.onRegister({ firstName, lastName, email, password }));
    }
  };
  return (
    <Box className="auth-wrap">
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography component="div" variant="h4" className="title-root">
            Create an account
          </Typography>
          <DialogContent dividers>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              mb={{ xs: 5.5, ml: 5.5 }}
            >
              <GridContainer>
                <Grid item xs={12} sm={5.75}>
                  <AppTextInput
                    fullWidth
                    size={""}
                    className="text-field-root full-width-text-box"
                    variant="outlined"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFisrtName(e.target.value);
                      setFirstNameError("");
                    }}
                    helperText={firstNameError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" variant="standard">
                          <IconButton
                            aria-label="First Name"
                            edge="end"
                            disabled
                          >
                            <PermIdentityIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5.75}>
                  <AppTextInput
                    fullWidth
                    size={""}
                    className="text-field-root full-width-text-box"
                    variant="outlined"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setLastNameError("");
                    }}
                    helperText={lastNameError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" variant="standard">
                          <IconButton
                            aria-label="Last Name"
                            edge="end"
                            disabled
                          >
                            <PersonIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </GridContainer>
            </Box>

            <Box mb={{ xs: 3, ml: 1 }}>
              <GridContainer>
                <Grid item xs={12} sm={12}>
                  <AppTextInput
                    fullWidth
                    size={""}
                    className="text-field-root"
                    variant="outlined"
                    label="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    helperText={emailError}
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
                </Grid>
              </GridContainer>
            </Box>

            <Box mb={{ xs: 3, ml: 1 }}>
              <GridContainer>
                <Grid item xs={12} sm={12}>
                  <CustomPasswordInput
                    password={password}
                    setPassword={setPassword}
                    helperText={passwordError}
                    setPasswordError={setPasswordError}
                  />
                </Grid>
              </GridContainer>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={{ xs: 5, ml: 2 }}
            >
              <Button onClick={onSubmit} variant="contained" color="primary">
                {"Sign Up"}
              </Button>
            </Box>

            <Typography className="text-acc">
              Have an account?
              <NavLink to="/login">Sign In</NavLink>
            </Typography>
          </DialogContent>
          <ContentLoader />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
