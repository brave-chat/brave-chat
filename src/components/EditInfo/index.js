import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import GridContainer from "../GridContainer";
import Grid from "@mui/material/Grid";
import AppTextInput from "../AppTextInput";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ContentLoader from "../ContentLoader";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import ThreePIcon from "@mui/icons-material/ThreeP";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { SetPersonalInfo } from "../../api/Axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./style.css";

const EditPersonalInformation = ({ open, onCloseDialog }) => {
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const dispatch = useDispatch();

  const onPhoneNoAdd = (number) => {
    const phone = number.replace("-", "");
    setPhoneNumber(phone);
    setPhoneNumberError("");
  };

  const onSubmit = () => {
    if (!firstName) {
      setFirstNameError("First name is required!");
    } else if (!lastName) {
      setLastNameError("Last name is required!");
    } else if (!bio) {
      setBioError("Bio is required!");
    } else if (!phoneNumber) {
      setPhoneNumberError("Phone number is required!");
    } else {
      dispatch(
        SetPersonalInfo(
          { firstName, lastName, bio, phoneNumber },
          onCloseDialog
        )
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className="dialog-root">
      <DialogTitle className="dialog-title-root">
        Edit Personal Information.
      </DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          mb={{ xs: 6, md: 5 }}
          mt={{ xs: 6, md: 5 }}
          ml={4}
        >
          <GridContainer>
            <Grid item xs={12} md={5.8}>
              <AppTextInput
                fullWidth
                className="text-field-root"
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
                      <IconButton aria-label="First Name" edge="end" disabled>
                        <PermIdentityIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5.8}>
              <AppTextInput
                fullWidth
                className="text-field-root"
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
                      <IconButton aria-label="Last Name" edge="end" disabled>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          mb={{ xs: 6, md: 5 }}
          mt={{ xs: 6, md: 5 }}
          ml={4}
        >
          <GridContainer>
            <Grid item xs={12} md={5.8}>
              <AppTextInput
                fullWidth
                className="text-field-root"
                variant="outlined"
                label="Bio"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setBioError("");
                }}
                helperText={bioError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" variant="standard">
                      <IconButton aria-label="Bio" edge="end" disabled>
                        <ThreePIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5.8}>
              <PhoneInput
                country={"us"}
                className="phone-field text-field-root"
                variant="outlined"
                label="Phone Number"
                enableSearch={true}
                onChange={(phoneNumber) => onPhoneNoAdd(phoneNumber)}
                helperText={phoneNumberError}
                InputProps={{
                  inputProps: { value: phoneNumber },
                  startAdornment: (
                    <InputAdornment position="start" variant="standard">
                      <IconButton aria-label="Phone Number" edge="end" disabled>
                        <DialpadIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={0}>
          <Button onClick={onCloseDialog} color="secondary">
            Cancel
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <ContentLoader variant="info" />
    </Dialog>
  );
};

EditPersonalInformation.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default EditPersonalInformation;
