import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CustomPasswordInput from "../CustomPassword";
import "./style.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // TODO: implement JWTAuth redux action
  };

  return (
    <Box className="auth-wrap">
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography component="div" variant="h4" className="title-root">
            Login
          </Typography>
          <form>
            <Box mb={2}>
              <TextField
                label="Email"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className="text-field-root"
              />
            </Box>
            <CustomPasswordInput
              password={password}
              setPassword={setPassword}
            />

            <Box
              display="flex"
              alignItems="left"
              justifyContent="space-between"
              mb={3}
            >
              <Button onClick={onSubmit} variant="contained" color="primary">
                {"Sign In"}
              </Button>
            </Box>
          </form>

          <Typography className="text-acc">
            Don't have an account?
            <NavLink to="/signup">Sign Up</NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
