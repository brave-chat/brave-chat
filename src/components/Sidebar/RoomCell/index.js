import React from "react";
import { Badge, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import "../style.css";
import { selectedRoom } from "../../../redux/appReducer/selectors";
import { onRoomSelect } from "../../../redux/appReducer/actions";

const RoomCell = ({ data, currentUser }) => {
  const dispatch = useDispatch();

  const updateSelectedRoom = () => {
    dispatch(onRoomSelect(data));
  };

  return (
    <Box
      className={clsx("room-cell-item", {
        active: true,
      })}
      onClick={updateSelectedRoom}
    >
      <Box className="room-cell-info">
        <Box display="flex" alignItems="center">
          <Typography component="div" className="title-root">
            # {data.room_name}
          </Typography>
        </Box>
        <Typography className="room-root">{data.description}</Typography>
      </Box>
    </Box>
  );
};

export default RoomCell;
