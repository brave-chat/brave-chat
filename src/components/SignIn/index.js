import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { JWTAuth } from "../../redux/appReducer/actions";
import ContentLoader from "../ContentLoader";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CustomPasswordInput from "../CustomPassword";
import GridContainer from "../GridContainer";
import Grid from "@mui/material/Grid";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import { isValidEmail } from "../Helper";
import "./style.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!isValidEmail(email)) {
      setEmailError("Email address must be valid!");
    } else if (!password) {
      setPasswordError("Password is required!");
    } else {
      dispatch(JWTAuth.onLogin({ email, password}));
    }
  };

  return (
    <Box className="auth-wrap">
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography component="div" variant="h4" className="title-root">
            Login
          </Typography>
          <DialogContent dividers>
            <Box mb={{ xs: 6, md: 5 }}>
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
                />
                </Grid>
              </GridContainer>
            </Box>
            <Box mb={{ xs: 6, md: 5 }}>

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
              alignItems="left"
              justifyContent="space-between"
              mb={6}
            >
              <Button onClick={onSubmit} variant="contained" color="primary">
                {"Sign In"}
              </Button>
            </Box>
          <Typography className="text-acc">
            Don't have an account?
            <NavLink to="/signup">Sign Up</NavLink>
          </Typography>
          </DialogContent>
          <ContentLoader />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
