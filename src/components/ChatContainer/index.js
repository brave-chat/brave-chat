import React, { useEffect } from "react";
import { Box } from "@mui/material";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversation,
  getRoomConversation,
  onUserSelect,
  onRoomSelect,
} from "../../redux/appReducer/actions";
import Conversation from "../Conversation";
import RoomConversation from "../RoomConversation";
import ContentHeader from "../ContentHeader";
import RoomContentHeader from "../RoomContentHeader";
import Typography from "@mui/material/Typography";
import CustomImage from "../CustomImage";
import ChatFooter from "../ChatFooter";
import {
  conversation,
  selectedUser,
  selectedRoom,
  roomConversation,
} from "../../redux/appReducer/selectors";
import ContentLoader from "../ContentLoader";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const thisConversation = useSelector(conversation);
  const thisRoomConversation = useSelector(roomConversation);

  const receiver = useSelector(selectedUser);
  const room = useSelector(selectedRoom);
  useEffect(() => {
    if (receiver && room) {
      dispatch(onUserSelect(null));
      dispatch(onRoomSelect(null));
    } else if (receiver && !room) dispatch(getConversation(receiver));
    else if (room && !receiver) dispatch(getRoomConversation(room));
  }, [receiver, dispatch, room]);

  const loadPrevious = () => {};

  if (!receiver && !room) {
    return (
      <Box className="chat-box-root">
        <Box mb={2}>
          <CustomImage src={"/images/logo.png"} />
        </Box>
        <Typography className="chat-box-title">
          Welcome to WiseAI Chat App!
        </Typography>
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
      <ContentLoader />
    </Box>
  );
};

export default ChatContainer;
