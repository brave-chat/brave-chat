import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { JWTAuth } from "../../api/Axios";
import ContentLoader from "../ContentLoader";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CustomPasswordInput from "../CustomPassword";
import GridContainer from "../GridContainer";
import Grid from "@mui/material/Grid";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import MailIcon from "@mui/icons-material/Mail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
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
      dispatch(JWTAuth.onLogin({ email, password }));
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
            <Box mb={{ xs: 4, ml: 1 }}>
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
              alignItems="left"
              justifyContent="space-between"
              mb={{ xs: 5.5, ml: 1 }}
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
