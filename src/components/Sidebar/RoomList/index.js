import React from "react";
import CustomList from "../../CustomList";
import RoomCell from "../RoomCell";
import { Box, Typography } from "@mui/material";
import AddRoom from "../../AddRoom"
import PerfectScrollbar from "react-perfect-scrollbar";
import NoRecordFound from "../NoRecordFound";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../style.css";

const RoomList = ({ rooms, currentUser }) => {

  const [addRoom, setAddRoom] = React.useState(false);
  const handleAddContacClose = () => {
    setAddRoom(false);
  };
  const handleAddRoom = () => {
    setAddRoom(true);
  }
  return (
      <Box>
        <Box  m={2} display="flex"   className="add-room" justifyContent="center" onClick={handleAddRoom}>
          <AddCircleOutlineIcon/>
        </Box>
      {rooms.length > 0 ? ( <PerfectScrollbar className="perfect-scroll-bar-root">
      <CustomList
        data={rooms}
        renderRow={(data) => {
          if (data.header) {
            return (
              <Box key={data.pk} className="room-cell-header">
                {data.title}
              </Box>
            );
          } else {
            return (
              <RoomCell
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
  )}

        <AddRoom open={addRoom} onCloseDialog={handleAddContacClose} />
        </Box>
)};

export default RoomList;
