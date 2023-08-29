import React from "react";
import CustomList from "../../CustomList";
import RoomCell from "../RoomCell";
import { Box } from "@mui/material";
import AddJoinRoom from "../../AddJoinRoom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import "../style.css";

const RoomList = ({ rooms, currentUser }) => {
  const [addRoom, setAddRoom] = React.useState(false);
  const [joinRoom, setJoinRoom] = React.useState(false);
  const handleAddRoomClose = () => {
    setAddRoom(false);
    setJoinRoom(false);
  };
  const handleAddRoom = () => {
    setJoinRoom(true);
    setAddRoom(false);
  };
  const handleJoinRoom = () => {
    setAddRoom(true);
    setJoinRoom(false);
  };
  return (
    <Box>
      <Box m={2} display="flex" justifyContent="center">
        <Box
          m={2}
          className="add-room"
          justifyContent="center"
          onClick={handleAddRoom}
        >
          <AddCircleOutlineIcon />
        </Box>
        <Box
          m={2}
          className="add-room"
          justifyContent="center"
          onClick={handleJoinRoom}
        >
          <CreateIcon />
        </Box>
      </Box>
      {rooms.length > 0 ? (
        <PerfectScrollbar className="perfect-scroll-bar-root">
          <CustomList
            data={rooms}
            renderRow={(data) => {
              if (data.header) {
                return (
                  <Box key={data.id} className="room-cell-header">
                    {data.title}
                  </Box>
                );
              } else {
                return (
                  <RoomCell
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
      <AddJoinRoom
        join={false}
        open={addRoom}
        onCloseDialog={handleAddRoomClose}
      />
      <AddJoinRoom
        join={true}
        open={joinRoom}
        onCloseDialog={handleAddRoomClose}
      />
    </Box>
  );
};

export default RoomList;
