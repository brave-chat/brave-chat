import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onUserSelect, onRoomSelect } from "../../redux/appReducer/actions";
import { getConversation, getRoomConversation } from "../../api/Axios";
import Conversation from "../Conversation";
import RoomConversation from "../RoomConversation";
import ContentHeader from "../ContentHeader";
import RoomContentHeader from "../RoomContentHeader";
import CustomImage from "../CustomImage";
import ChatFooter from "../ChatFooter";
import ContentLoader from "../ContentLoader";
import {
  conversation,
  selectedUser,
  selectedRoom,
  roomConversation,
  authUser,
} from "../../redux/appReducer/selectors";
import { initiateRoomSocket, initiateChatSocket } from "../../api/Socket";
import { useTheme } from "@mui/material/styles";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const thisConversation = useSelector(conversation);
  const thisRoomConversation = useSelector(roomConversation);
  const currentAuthUser = useSelector(authUser);
  const receiver = useSelector(selectedUser);
  const room = useSelector(selectedRoom);
  const theme = useTheme();

  useEffect(() => {
    if (receiver && room) {
      dispatch(onUserSelect(null));
      dispatch(onRoomSelect(null));
    } else if (receiver && !room) {
      dispatch(getConversation(receiver));
      dispatch(initiateChatSocket(currentAuthUser, receiver));
    } else if (room && !receiver) {
      dispatch(getRoomConversation(room));
      dispatch(initiateRoomSocket(currentAuthUser, room.room_name));
    }
  }, [receiver, dispatch, room, currentAuthUser]);

  if (!receiver && !room) {
    return (
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {theme.palette.mode === "light" ? (
          <CustomImage src={"/dark-logo.png"} />
        ) : (
          <CustomImage src={"/logo.png"} />
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "100%",
        transition: "all 0.3s ease",
        zIndex: 999,
      }}
    >
      {receiver && (
        <>
          <ContentHeader user={receiver} />
          <Conversation
            conversation={thisConversation}
            selectedUser={receiver}
          />
          <ChatFooter receiver={receiver} />
        </>
      )}
      {room && (
        <>
          <RoomContentHeader room={room} />
          <RoomConversation
            conversation={thisRoomConversation}
            selectedRoom={room}
          />
          <ChatFooter receiver={room} />
        </>
      )}
      <ContentLoader withLoader={false} variant="info" />
    </Box>
  );
};

export default ChatContainer;
