import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {
  getChatUsers,
  getContactUsers,
  getRoomsUser,
  onUserSelect,
} from "../../redux/appReducer/actions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactList from "./ContactList";
import RoomList from "./RoomList";
import ChatUserList from "./ChatUserList";
import {
  users,
  currentUser,
  contacts,
  selectedUser,
  rooms,
} from "../../redux/appReducer/selectors";

const Sidebar = () => {
  const currentUsers = useSelector(users);
  let thisCurrentUser = useSelector(currentUser);
  const thisSelectedUser = useSelector(selectedUser);
  const currentContacts = useSelector(contacts);
  const currentRooms = useSelector(rooms);
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
    console.log(value)
    if (value === 1) {
      dispatch(getChatUsers(searchText));
    }
    if (value === 2){
      dispatch(getContactUsers(searchText));
    }
    if (value === 3) {
      dispatch(getRoomsUser(searchText));
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
        <Tab icon={<ChatIcon />} className="tab-root" label="Chats" value={1} />
        <Tab icon={<FavoriteIcon />} className="tab-root" label="Contacts" value={2} />
        <Tab icon={<MeetingRoomIcon />} className="tab-root" label="Rooms" value={3} />
      </Tabs>
      {value === 1 ? (
        <ChatUserList
          currentUser={thisCurrentUser}
          users={currentUsers.sort(function (x, y) {
            return y.chat_status - x.chat_status;
          })}
          onContactSelect={onContactSelect}
        />
      ) : value === 2 ? (
        <ContactList
          currentUser={thisCurrentUser}
          contacts={currentContacts.sort(function (x, y) {
            return y.first_name - x.first_name;
          })}
        />
      ): (
        <RoomList
          currentUser={thisCurrentUser}
          rooms={currentRooms}
        />
      )}
    </Box>
  );
};

export default Sidebar;
