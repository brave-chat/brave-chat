import React from "react";
import CustomList from "../../CustomList";
import ContactCell from "../ContactCell";
import { Box } from "@mui/material";
import AddContact from "../../AddContact";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fetchSuccess } from "../../../redux/appReducer/actions";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";

const ContactList = ({ contacts, currentUser }) => {
  const theme = useTheme();
  const [addContact, setAddContact] = React.useState(false);
  const dispatch = useDispatch();

  const handleAddContacClose = () => {
    setAddContact(false);
  };

  const handleAddContact = () => {
    dispatch(fetchSuccess(""));
    setAddContact(true);
  };

  return (
    <Box>
      <Box
        m={2}
        display="flex"
        sx={{
          color: theme.palette.text.primary,
          cursor: "pointer",
          justifyContent: "center",
          "&:hover": {
            color: theme.palette.text.secondary,
          },
        }}
        onClick={handleAddContact}
      >
        <AddCircleOutlineIcon />
      </Box>
      {contacts.length > 0 ? (
        <PerfectScrollbar
          style={{
            overflowY: "auto",
            maxHeight: "100vh",
            position: "absolute",
          }}
        >
          <CustomList
            data={contacts}
            sx={{
              width: { md: "360px", xs: "100vw", sm: "360px" },
            }}
            renderRow={(data) => {
              if (data.header) {
                return (
                  <Box
                    key={data.id}
                    sx={{
                      color: theme.palette.text.primary,
                      borderBottom: "1px solid rgba(2, 2, 2, 0.04)",
                      padding: "13px",
                      fontWeight: "bold",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      borderTop: "2px solid grey",
                      borderBottom: "2px solid grey",
                    }}
                  >
                    {data.title}
                  </Box>
                );
              } else {
                return (
                  <ContactCell
                    key={data.id}
                    data={data}
                    currentUser={currentUser}
                  />
                );
              }
            }}
          />
        </PerfectScrollbar>
      ) : (
        <NoRecordFound />
      )}

      <AddContact open={addContact} onCloseDialog={handleAddContacClose} />
    </Box>
  );
};

export default ContactList;
