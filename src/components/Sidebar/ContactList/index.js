import React from "react";
import CustomList from "../../CustomList";
import ContactCell from "../ContactCell";
import { Box } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";
import "../style.css";

const ContactList = ({ contacts, currentUser, width, onContactSelect }) => {
  const generateHeaderList = () => {
    if (contacts.length === 0) {
      return [];
    }
    let contactList = [];
    let isFavourite = true;
    contactList = [{ id: "header-0", header: true, title: "Favourite" }];

    contacts.map((contact) => {
      if (isFavourite !== contact.favourite) {
        contactList = contactList.concat({
          id: "header-" + contactList.length,
          header: true,
          title: "Contacts",
        });
        isFavourite = false;
      }
      contactList = contactList.concat(contact);

      return contact;
    });
    return contactList;
  };

  return contacts.length > 0 ? (
    <PerfectScrollbar className="perfect-scroll-bar-root">
      <CustomList
        data={generateHeaderList()}
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
                onContactSelect={onContactSelect}
              />
            );
          }
        }}
      />
    </PerfectScrollbar>
  ) : (
    <NoRecordFound />
  );
};

export default ContactList;
