import React from "react";
import CustomList from "../../CustomList";
import ContactCell from "../ContactCell";
import { Box } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";
import "../style.css";

const ContactList = ({ contacts, currentUser }) => {
  const generateHeaderList = () => {
    if (contacts.length === 0) {
      return [];
    }
    let contactList = [];
    let isFavourite = "true";
    contactList = [{ id: "header-0", header: true, title: "Favourites" }];

    contacts.map((contact) => {
      if (contact.favourite != isFavourite) {
        contactList = contactList.concat({
          id: "header-" + contactList.length,
          header: true,
          title: "Contacts",
        });
        isFavourite = "false";
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
              <Box key={data.pk} className="chat-cell-header">
                {data.title}
              </Box>
            );
          } else {
            return (
              <ContactCell
                key={data.pk}
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
  );
};

export default ContactList;
