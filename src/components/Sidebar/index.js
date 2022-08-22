import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";
import {
  getChatUsers,
  getContactUsers,
  onUserSelect,
} from "../../redux/appReducer/actions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactList from "./ContactList";
import ChatUserList from "./ChatUserList";
import {
  users,
  currentUser,
  contacts,
  selectedUser,
} from "../../redux/appReducer/selectors";

const Sidebar = () => {
  const currentUsers = useSelector(users);
  let thisCurrentUser = useSelector(currentUser);
  const thisSelectedUser = useSelector(selectedUser);
  const currentContacts = useSelector(contacts);
  const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const onContactSelect = (contact) => {
    dispatch(onUserSelect(contact));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1) {
      dispatch(getChatUsers(searchText));
    } else {
      dispatch(getContactUsers(searchText));
    }
  }, [dispatch, searchText, value]);

  return (
    <Box className="in-build-app-sidebar">
      <SidebarHeader
        user={thisCurrentUser}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Tabs
        className="tab-container"
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab className="tab-root" label="Chat" value={1} />
        <Tab className="tab-root" label="Contact" value={2} />
      </Tabs>
      {value === 1 ? (
        <ChatUserList
          currentUser={thisCurrentUser}
          users={currentUsers.sort(function (x, y) {
            return y.chat_status - x.chat_status;
          })}
          onContactSelect={onContactSelect}
        />
      ) : (
        <ContactList
          currentUser={thisCurrentUser}
          contacts={currentContacts.sort(function (x, y) {
            return y.favourite - x.favourite;
          })}
        />
      )}
    </Box>
  );
};

export default Sidebar;
