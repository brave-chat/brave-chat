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
import { SetPersonalInfo } from "../../api/Axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./style.css";

const EditPersonalInformation = ({ open, onCloseDialog }) => {
  const [personalInfoValues, setPersonalInfoValues] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phoneNumber: "",
  });

  const [errorValues, setErrorValues] = useState({
    firstNameError: "",
    lastNameError: "",
    bioError: "",
    phoneNumberError: "",
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    const { firstName, lastName, bio, phoneNumber } = personalInfoValues;

    if (!firstName) {
      setErrorValues({
        ...errorValues,
        firstNameError: "This field is required!",
      });
    } else if (!lastName) {
      setErrorValues({
        ...errorValues,
        lastNameError: "This field is required!",
      });
    } else if (!bio) {
      setErrorValues({
        ...errorValues,
        bioError: "This field is required!",
      });
    } else if (!phoneNumber) {
      setErrorValues({
        ...errorValues,
        phoneNumberError: "This field is required!",
      });
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
                value={personalInfoValues.firstName}
                onChange={(e) => {
                  setPersonalInfoValues({
                    ...personalInfoValues,
                    firstName: e.target.value,
                  });
                  setErrorValues({ ...errorValues, firstNameError: "" });
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
            </Grid>
            <Grid item xs={12} md={5.8}>
              <AppTextInput
                fullWidth
                className="text-field-root"
                variant="outlined"
                label="Last Name"
                value={personalInfoValues.lastName}
                onChange={(e) => {
                  setPersonalInfoValues({
                    ...personalInfoValues,
                    lastName: e.target.value,
                  });
                  setErrorValues({ ...errorValues, lastNameError: "" });
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
                value={personalInfoValues.bio}
                onChange={(e) => {
                  setPersonalInfoValues({
                    ...personalInfoValues,
                    bio: e.target.value,
                  });
                  setErrorValues({ ...errorValues, bioError: "" });
                }}
                helperText={errorValues.bioError}
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
                onChange={(phoneNumber) => {
                  setPersonalInfoValues({
                    ...personalInfoValues,
                    phoneNumber: phoneNumber,
                  });
                  setErrorValues({ ...errorValues, phoneNumberError: "" });
                }}
                helperText={errorValues.phoneNumberError}
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
