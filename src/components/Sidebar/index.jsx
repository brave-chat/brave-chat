import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactList from "./ContactList";
import RoomList from "./RoomList";
import ChatUserList from "./ChatUserList";
import {
  users,
  currentUser,
  contacts,
  rooms,
} from "../../redux/appReducer/selectors";
import { onUserSelect } from "../../redux/appReducer/actions";
import { getChatUsers, getContactUsers, getRoomsUser } from "../../api/Axios";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const currentUsers = useSelector(users);
  const theme = useTheme();
  let thisCurrentUser = useSelector(currentUser);
  const currentContacts = useSelector(contacts);
  const currentRooms = useSelector(rooms);
  const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [nbTotalNonRead, setNbTotalNonRead] = useState(
    currentUsers && currentUsers.length > 0
      ? currentUsers[0].nb_total_unread_message
      : null
  );
  const [previousUser, setPreviousUser] = useState();

  const dispatch = useDispatch();

  const onUserChatSelect = (user) => {
    if (!previousUser) {
      setNbTotalNonRead(
        currentUsers[0].nb_total_unread_message - user.nb_unread_message
      );
      user.nb_unread_message = 0;
      setPreviousUser(user);
      dispatch(onUserSelect(user));
      return;
    }
    if (previousUser.email !== user.email) {
      setNbTotalNonRead(nbTotalNonRead - user.nb_unread_message);
      user.nb_unread_message = 0;
    }
    setPreviousUser(user);
    dispatch(onUserSelect(user));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1) {
      dispatch(getChatUsers(searchText));
    }
    if (value === 2) {
      dispatch(getContactUsers(searchText));
    }
    if (value === 3) {
      dispatch(getRoomsUser(searchText));
    }
  }, [dispatch, searchText, value]);

  return (
    <Box
      sx={{
        width: { md: "360px", xs: "100vw", sm: "360px" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflow: "hidden",
        boxShadow: theme.shadows[3],
        "@media screen and (max-width: 767px)": {
          height: "100%",
          position: "absolute",
          backgroundColor: theme.palette.background.paper,
          left: 0,
          top: 0,
          zIndex: 3,
        },
        "@media screen and (max-width: 1200px)": {
          ".chat-box-title": {
            fontSize: "20px",
          },
        },
        "@media screen and (min-width: 0px)": {
          ".title-root": {
            fontSize: "14px",
          },
          ".star-icon-root": {
            fontSize: "18px",
          },
        },
      }}
    >
      <SidebarHeader
        user={thisCurrentUser}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Tabs
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab
          icon={
            <Badge
              badgeContent={
                !nbTotalNonRead
                  ? currentUsers && currentUsers.length > 0
                    ? currentUsers[0].nb_total_unread_message
                    : null
                  : nbTotalNonRead
              }
              color="primary"
            >
              <ChatIcon />
            </Badge>
          }
          sx={{
            fontSize: 12,
            letterSpacing: "1.25px",
            minWidth: "20px",
            width: "33.3%",
          }}
          label="Chats"
          value={1}
        />
        <Tab
          icon={<FavoriteIcon />}
          sx={{
            fontSize: 12,
            letterSpacing: "1.25px",
            minWidth: "20px",
            width: "33.3%",
          }}
          label="Contacts"
          value={2}
        />
        <Tab
          icon={<MeetingRoomIcon />}
          sx={{
            fontSize: 12,
            letterSpacing: "1.25px",
            minWidth: "20px",
            width: "33.3%",
          }}
          label="Rooms"
          value={3}
        />
      </Tabs>
      {value === 1 ? (
        <ChatUserList
          currentUser={thisCurrentUser}
          users={
            currentUsers &&
            currentUsers.sort(function (x, y) {
              return (
                Date.parse(y.last_message_time) -
                Date.parse(x.last_message_time)
              );
            })
          }
          onUserSelect={onUserChatSelect}
        />
      ) : value === 2 ? (
        <ContactList
          currentUser={thisCurrentUser}
          contacts={currentContacts.sort(function (x, y) {
            return y.first_name - x.first_name;
          })}
        />
      ) : value === 3 ? (
        <RoomList currentUser={thisCurrentUser} rooms={currentRooms} />
      ) : null}
    </Box>
  );
};

export default Sidebar;
