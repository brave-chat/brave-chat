import React from "react";
import { Box, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomList from "../../CustomList";
import RoomCell from "../RoomCell";
import AddJoinRoom from "../../AddJoinRoom";
import NoRecordFound from "../NoRecordFound";

const RoomList = ({ rooms, currentUser }) => {
  const theme = useTheme();
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
      <Box
        m={2}
        display="flex"
        justifyContent="center"
        sx={{
          "& .add-room": {
            cursor: "pointer",
            m: 2,
            justifyContent: "center",
          },
        }}
      >
        <Box
          className="add-room"
          onClick={handleAddRoom}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <AddCircleOutlineIcon />
        </Box>
        <Box
          className="add-room"
          onClick={handleJoinRoom}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <CreateIcon />
        </Box>
      </Box>
      {rooms.length > 0 ? (
        <PerfectScrollbar
          sx={{
            height: "100vh",
          }}
        >
          <CustomList
            data={rooms}
            renderRow={(data) => {
              if (data.header) {
                return (
                  <Box
                    key={data.id}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      padding: theme.spacing(2),
                      fontWeight: "bold",
                      fontSize: theme.typography.pxToRem(15),
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                      letterSpacing: theme.spacing(0.375),
                      borderTop: `2px solid ${theme.palette.grey[500]}`,
                      borderBottom: `2px solid ${theme.palette.grey[500]}`,
                    }}
                  >
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
