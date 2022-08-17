import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CustomPasswordInput from "../CustomPassword";
import "../SignIn/style.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // TODO: implement redux submit reducer
  };

  return (
    <Box className="auth-wrap">
      <Box className="auth-card">
        <Box className="auth-content">
          <Typography component="div" variant="h4" className="title-root">
            Create an account
          </Typography>
          <form>
            <Box mb={2}>
              <TextField
                label="Username"
                fullWidth
                onChange={(event) => setName(event.target.value)}
                defaultValue={name}
                margin="normal"
                variant="outlined"
                className="text-field-root"
              />
            </Box>
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
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Button onClick={onSubmit} variant="contained" color="primary">
                {"Sign Up"}
              </Button>
            </Box>
          </form>

          <Typography className="text-acc">
            Have an account?
            <NavLink to="/login">Sign In</NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
