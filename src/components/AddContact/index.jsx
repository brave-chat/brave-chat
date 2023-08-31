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
    <Dialog
      open={open}
      onClose={onCloseDialog}
      sx={{ root: { backgroundColor: theme.palette.background.paper } }}
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[500],
          border: `3px solid ${theme.palette.primary.main}`,
        }}
      >
        Add Contact.
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: theme.palette.background.primary }}
        dividers
      >
        <Box component="form" onSubmit={onSubmit}>
          <Box
            alignItems="center"
            m={{ xs: 2, md: 6 }}
            sx={{
              color: theme.palette.common.white,
              ml: theme.spacing(1),
              mb: 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                ml: theme.spacing(1),
                mb: 0,
              }}
            >
              Email Address
              <span
                style={{ color: theme.palette.error.main, marginLeft: "5px" }}
              >
                *
              </span>
            </Typography>
            <AppTextInput
              fullWidth
              sx={{
                width: "100%",
                ml: theme.spacing(1),
                mr: theme.spacing(1),
                mt: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.text.primary,
              }}
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
                      <MailIcon style={{ color: theme.palette.text.primary }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <ContentLoader variant="info" />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button onClick={onCloseDialog} color="secondary">
              Cancel
            </Button>
            <Box sx={{ ml: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddContact;
