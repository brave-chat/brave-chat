import React from "react";
import CustomList from "../../CustomList";
import ChatUserCell from "../ChatUserCell";
import NoRecordFound from "../NoRecordFound";
import PerfectScrollbar from "react-perfect-scrollbar";

const ChatUserList = ({ users, width, currentUser, onUserSelect }) => {
  return users && users.length > 0 ? (
    <PerfectScrollbar
      sx={{
        height: "100vh",
      }}
    >
      <CustomList
        data={users}
        renderRow={(data) => {
          return (
            <ChatUserCell
              key={data.id}
              currentUser={currentUser}
              data={data}
              onUserSelect={onUserSelect}
            />
          );
        }}
      />
    </PerfectScrollbar>
  ) : (
    <NoRecordFound />
  );
};

export default ChatUserList;
