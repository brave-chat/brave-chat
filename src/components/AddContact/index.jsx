import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import ContentLoader from "../ContentLoader";
import AppTextInput from "../AppTextInput";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MailIcon from "@mui/icons-material/Mail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { isValidEmail } from "../Helper";
import { addContactEmail } from "../../api/Axios";
import { useTheme } from "@mui/material/styles";

import "./style.css";

const AddContact = ({ open, onCloseDialog }) => {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();
  const theme = useTheme();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Email address must be valid!");
    } else {
      dispatch(addContactEmail(email, onCloseDialog));
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className="dialog-root">
      <DialogTitle className="dialog-title-root">Add Contact.</DialogTitle>
      <DialogContent dividers>
        <Box
          alignItems="center"
          m={{ xs: 2, md: 6 }}
          component="form"
          onSubmit={onSubmit}
        >
          <Typography
            variant="body1"
            sx={{
              color: "common.white",
              ml: theme.spacing(1),
              mb: 0,
            }}
          >
            Email Address
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </Typography>
          <AppTextInput
            fullWidth
            className="text-field-root"
            variant="outlined"
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
        </Box>
        <ContentLoader variant="info" />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button onClick={onCloseDialog} color="secondary">
            Cancel
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddContact;
