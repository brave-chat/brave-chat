import React from "react";
import CustomList from "../../CustomList";
import ChatUserCell from "../ChatUserCell";
import "../style.css";
import NoRecordFound from "../NoRecordFound";

const ChatUserList = ({ users, width, currentUser, onContactSelect }) => {
  return users && users.length > 0 ? (
    <CustomList
      data={users}
      renderRow={(data) => {
        return (
          <ChatUserCell
            key={data.id}
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
