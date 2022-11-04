import React, { useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";
import "../style.css";
import clsx from "clsx";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";
import TextToHtml from "../../TextToHtml";
import { Typography } from "@mui/material";
import ProfileDetail from "../../Sidebar/ProfileDetail";
import { Server } from "../../../utils";

import Popover from "@mui/material/Popover";
const ReceivedMessageCell = ({ conversation, user }) => {
  const [position, setPosition] = useState(-1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
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
  return (
    <Box className={clsx("chat-msg-item", "received-msg-item")}>
      <Box onClick={handleClick} className="chat-avatar">
        <CustomAvatar
          src={conversation.profile_picture}
          alt={conversation.first_name}
        />
      </Box>
      <Box className="chat-msg-content">
        <Box className={clsx("chat-bubble", "receive-bubble")}>
          {conversation.media.length === 0 ? (
            <TextToHtml content={conversation.content} />
          ) : typeof conversation.media === "string" &&
            conversation.media.length > 0 ? (
            <Box>
              <CustomImage
                key={conversation.id}
                src={`${Server.endpoint}${conversation.media}`}
                alt={"image"}
                height={100}
                width={100}
              />

              <MediaViewer
                position={position}
                medias={[`${Server.endpoint}${conversation.media}`]}
                handleClose={handleClose}
              />
            </Box>
          ) : (
            <Box className="chat-bubble-img">
              <Box className="chat-bubble-img-row">
                {typeof conversation.media.map === "function" &&
                  conversation.media.map((data, index) => (
                    <Box
                      key={index}
                      className="chat-bubble-img-item"
                      onClick={() => setPosition(index)}
                    >
                      <Box className="chat-bubble-img-item-inner">
                        {data.metaData.type.startsWith("image") ? (
                          <CustomImage
                            key={index}
                            src={data.preview}
                            alt={data.name}
                          />
                        ) : (
                          <iframe
                            key={index}
                            src={data.preview}
                            title={data.name}
                            height={100}
                            width={100}
                          />
                        )}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
        <Box className="chat-time">
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
      <MediaViewer
        position={position}
        medias={conversation.media}
        handleClose={handleClose}
      />
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
        </Box>
      </Popover>
    </Box>
  );
};

export default ReceivedMessageCell;
