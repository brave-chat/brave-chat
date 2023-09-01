import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onRoomSelect } from "../../../redux/appReducer/actions";
import { useTheme } from "@mui/material/styles";
import { selectedRoom } from "../../../redux/appReducer/selectors";

const RoomCell = ({ data, currentUser }) => {
  const roomSelected = useSelector(selectedRoom);
  const theme = useTheme();
  const dispatch = useDispatch();

  const updateSelectedRoom = () => {
    dispatch(onRoomSelect(data));
  };

  return (
    <Box
      sx={{
        padding: "16px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: theme.palette.background.main,
        ":hover, &.active": {
          backgroundColor: theme.palette.action.hover,
        },
        ...(roomSelected &&
          roomSelected.room_name === data.room_name && {
            backgroundColor: theme.palette.action.hover,
          }),
      }}
      onClick={updateSelectedRoom}
    >
      <Box>
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            sx={{
              position: "relative",
              fontSize: "22px",
              color: theme.palette.text.primary,
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            # {data.room_name}
          </Typography>
        </Box>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "22px",
            color: theme.palette.text.secondary,
            paddingRight: "10px",
            width: "100%",
          }}
        >
          {data.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoomCell;
