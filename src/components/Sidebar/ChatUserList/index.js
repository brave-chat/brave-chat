import React from "react";
import CustomList from "../../CustomList";
import ChatUserCell from "../ChatUserCell";
import { Box } from "@mui/material";
import "../style.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";

const ChatUserList = ({ users, width, currentUser, onContactSelect }) => {
  const generateHeaderList = () => {
    if (users.length === 0) {
      return [];
    }
    let userLsit = [];
    let isFavourite = true;
    userLsit = [{ id: "header-0", header: true, title: "Favourite" }];

    users.map((user) => {
      if (isFavourite !== user.favourite) {
        userLsit = userLsit.concat({
          id: "header-" + userLsit.length,
          header: true,
          title: "Contacts",
        });
        isFavourite = false;
      }
      userLsit = userLsit.concat(user);

      return user;
    });
    return userLsit;
  };

  return users.length > 0 ? (
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
              <ChatUserCell
                key={data.id}
                currentUser={currentUser}
                data={data}
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

export default ChatUserList;
