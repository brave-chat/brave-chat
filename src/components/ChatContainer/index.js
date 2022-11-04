import React, { useEffect } from "react";
import { Box } from "@mui/material";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { onUserSelect, onRoomSelect } from "../../redux/appReducer/actions";

import { getConversation, getRoomConversation } from "../../api/Axios";

import Conversation from "../Conversation";
import RoomConversation from "../RoomConversation";
import ContentHeader from "../ContentHeader";
import RoomContentHeader from "../RoomContentHeader";
import Typography from "@mui/material/Typography";
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

const ChatContainer = () => {
  const dispatch = useDispatch();
  const thisConversation = useSelector(conversation);
  const thisRoomConversation = useSelector(roomConversation);
  const currentAuthUser = useSelector(authUser);

  const receiver = useSelector(selectedUser);
  const room = useSelector(selectedRoom);
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
      <Box className="chat-box-root">
        <Box mb={2}>
          <CustomImage src={"/logo.png"} />
        </Box>
      </Box>
    );
  }
  return (
    <Box className="in-build-app-main-content">
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
