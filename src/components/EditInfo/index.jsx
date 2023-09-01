import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { useTheme } from "@mui/material/styles";
import "./style.css";

const EditPersonalInformation = ({ open, onCloseDialog }) => {
  const theme = useTheme();
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

  const onSubmit = (event) => {
    event.preventDefault();
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
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle
        sx={{
          fontSize: "16px",
          color: "common.white",
          backgroundColor: "grey",
          border: `3px solid ${theme.palette.primary.main}`,
        }}
      >
        Edit Personal Information.
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={onSubmit}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            mb={{ xs: 6, md: 5 }}
            mt={{ xs: 2, md: 2 }}
          >
            <GridContainer>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                  }}
                >
                  First Name
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
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
                          <PermIdentityIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.text.primary,
                    fontSize: "16px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  Last Name
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
                  variant="outlined"
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
                          <PersonIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    marginRight: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    fontSize: "16px",
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
          >
            <GridContainer>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(1),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  Bio
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <AppTextInput
                  fullWidth
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
                          <ThreePIcon
                            style={{ color: theme.palette.text.primary }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    marginRight: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    fontSize: "16px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: theme.spacing(7),
                    mb: 0,
                    mt: { md: 0, sm: theme.spacing(-3), xs: theme.spacing(-3) },
                  }}
                >
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </Typography>
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  onChange={(phoneNumber) => {
                    setPersonalInfoValues({
                      ...personalInfoValues,
                      phoneNumber: phoneNumber,
                    });
                    setErrorValues({ ...errorValues, phoneNumberError: "" });
                  }}
                  helperText={errorValues.phoneNumberError}
                  style={{
                    width: "100%",
                    marginRight: theme.spacing(2),
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                    height: "1.4375em",
                    fontSize: "16px",
                  }}
                  containerStyle={{ overflow: "hidden" }}
                  inputStyle={{
                    height: "1.4375em",
                    fontSize: "16px",
                    backgroundColor: theme.palette.background.paper,
                    width: "100%",
                  }}
                  buttonStyle={{
                    backgroundColor: theme.palette.background.main,
                    top: "18px",
                    left: "12px",
                  }}
                  specialLabelStyle={{
                    backgroundColor: theme.palette.background.paper,
                    lineHeight: "1em",
                    top: "-22px",
                    left: "-0.6px",
                    fontSize: "16px",
                  }}
                  selectedFlagStyle={{ top: "-12px" }}
                  countryListStyle={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.main,
                  }}
                  countryListItemStyle={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.main,
                  }}
                  flagDropDownStyle={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.main,
                  }}
                  flagDropDownListItemStyle={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.main,
                  }}
                  searchStyle={{
                    backgroundColor: theme.palette.background.main,
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
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <ContentLoader variant="info" />
    </Dialog>
  );
};

EditPersonalInformation.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default EditPersonalInformation;
