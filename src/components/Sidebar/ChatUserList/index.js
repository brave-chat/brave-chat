import React from "react";
import CustomList from "../../CustomList";
import ChatUserCell from "../ChatUserCell";
import { Box } from "@mui/material";
import "../style.css";
import NoRecordFound from "../NoRecordFound";

const ChatUserList = ({ users, width, currentUser, onContactSelect }) => {
  return users.length > 0 ? (
    <CustomList
      data={users}
      renderRow={(data) => {
        return (
          <ChatUserCell
            key={data.pk}
            currentUser={currentUser}
            data={data}
            onContactSelect={onContactSelect}
          />
        );
      }}
    />
  ) : (
    <NoRecordFound />
  );
};

export default ChatUserList;
