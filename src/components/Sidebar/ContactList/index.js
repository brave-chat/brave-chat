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

import "../style.css";

const ContactList = ({ contacts, currentUser }) => {
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
        className="add-contact"
        justifyContent="center"
        onClick={handleAddContact}
      >
        <AddCircleOutlineIcon />
      </Box>
      {contacts.length > 0 ? (
        <PerfectScrollbar className="perfect-scroll-bar-root">
          <CustomList
            data={contacts}
            renderRow={(data) => {
              if (data.header) {
                return (
                  <Box key={data.id} className="chat-cell-header">
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
