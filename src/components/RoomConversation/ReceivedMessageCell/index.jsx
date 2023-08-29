import React, { useState } from "react";
import moment from "moment";
import { Box, Button } from "@mui/material";

import "../style.css";
import clsx from "clsx";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";

import { Typography } from "@mui/material";
import ProfileDetail from "../../Sidebar/ProfileDetail";
import { Server } from "../../../utils";
import { useDispatch } from "react-redux";
import { banUserFromRoom, unbanUserFromRoom } from "../../../api/Axios";

import Popover from "@mui/material/Popover";
const ReceivedMessageCell = ({ conversation, room }) => {
  const [position, setPosition] = useState(-1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setPosition(-1);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = "user-popover";
  const getStatusColor = () => {
    if (!conversation.chat_status) {
      return "#c1c1c1";
    }
    switch (conversation.chat_status.toLowerCase()) {
      case "online":
        return "#8DCD03";
      case "busy":
        return "#FF8C00";
      case "don't disturb":
        return "#E00930";
      default:
        return "#C1C1C1";
    }
  };

  const dispatch = useDispatch();
  const onBanClick = () => {
    if (conversation.sender) {
      dispatch(banUserFromRoom(conversation.sender, room.room_name));
    } else {
      dispatch(banUserFromRoom(conversation, room.room_name));
    }
  };
  const onUnBanClick = () => {
    if (conversation.sender) {
      dispatch(unbanUserFromRoom(conversation.sender, room.room_name));
    } else {
      dispatch(unbanUserFromRoom(conversation, room.room_name));
    }
  };

  return (
    <Box className={clsx("chat-msg-item", "received-msg-item")}>
      <Box onClick={handleClick} className="chat-avatar">
        {!conversation.sender ? (
          <CustomAvatar
            src={conversation.profile_picture}
            alt={conversation.first_name}
          />
        ) : (
          <CustomAvatar
            src={conversation.sender.profile_picture}
            onClick={handleClick}
          />
        )}
      </Box>
      <Box className="chat-msg-content">
        <Box className="chat-bubble">
          {conversation.content.length > 0 ? (
            checkHtml(conversation.content) ? (
              parse(conversation.content)
            ) : (
              <ReactMarkdown
                children={conversation.content}
                remarkPlugins={[remarkGfm]}
              />
            )
          ) : typeof conversation.media === "string" &&
            conversation.media.length > 0 &&
            conversation.content.length === 0 ? (
            <Box>
              <CustomImage
                onClick={() => {
                  setPosition(0);
                }}
                key={conversation.id}
                src={`${Server.endpoint}${conversation.media}`}
                alt={"image"}
                height={100}
                width={100}
              />
              <MediaViewer
                position={position}
                medias={{
                  preview: `${Server.endpoint}${conversation.media}`,
                  name: "image",
                }}
                handleClose={handleClose}
              />
            </Box>
          ) : (
            <Box>
              <CustomImage
                onClick={() => {
                  setPosition(0);
                }}
                key={conversation.id}
                src={conversation.media.preview}
                alt={"image"}
                height={100}
                width={100}
              />
              <MediaViewer
                position={position}
                medias={{ preview: conversation.media.preview, name: "image" }}
                handleClose={handleClose}
              />
            </Box>
          )}
        </Box>
        <Box className="chat-time">
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {conversation.sender ? (
          <Box p={{ xs: 4, md: 6 }}>
            <Box className="user-root">
              <CustomAvatar
                src={conversation.sender.profile_picture}
                onClick={handleClick}
              />
              <Box className={clsx("user-info", "custom-user-info")}>
                <Typography className="user-title" component="h3" variant="h6">
                  {conversation.sender.first_name +
                    " " +
                    conversation.sender.last_name}
                </Typography>
                <Typography className="user-sub-title" component="span">
                  {conversation.sender.bio
                    ? conversation.sender.bio.substring(0, 30) + "..."
                    : ""}
                </Typography>
              </Box>
            </Box>
            <ProfileDetail
              currentUser={false}
              user={conversation.sender}
              userStatus={conversation.sender.chat_status}
              setUserStatus={() => {}}
              statusColor={getStatusColor()}
            />

            {conversation.sender.admin === 1 ? (
              <Box mt={3} display="flex" flexDirection={"row"}>
                <Box mr={3}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onBanClick}
                  >
                    Ban
                  </Button>
                </Box>
                <Box mr={3}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={onUnBanClick}
                  >
                    UnBan
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Box>
        ) : (
          <Box p={{ xs: 4, md: 6 }}>
            <Box className="user-root">
              <CustomAvatar
                src={conversation.profile_picture}
                onClick={handleClick}
              />
              <Box className={clsx("user-info", "custom-user-info")}>
                <Typography className="user-title" component="h3" variant="h6">
                  {conversation.first_name + " " + conversation.last_name}
                </Typography>
                <Typography className="user-sub-title" component="span">
                  {conversation.bio
                    ? conversation.bio.substring(0, 30) + "..."
                    : ""}
                </Typography>
              </Box>
            </Box>
            <ProfileDetail
              currentUser={false}
              user={conversation}
              userStatus={conversation.chat_status}
              setUserStatus={() => {}}
              statusColor={getStatusColor()}
            />
            {conversation.admin === 1 ? (
              <Box mt={3} display="flex" flexDirection={"row"}>
                <Box mr={3}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onBanClick}
                  >
                    Ban
                  </Button>
                </Box>
                <Box mr={3}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={onUnBanClick}
                  >
                    UnBan
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default ReceivedMessageCell;
