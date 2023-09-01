import React, { useState } from "react";
import moment from "moment";
import { Box, Button, Typography, useTheme, Popover } from "@mui/material";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";
import { Server } from "../../../utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";
import ProfileDetail from "../../Sidebar/ProfileDetail";
import { useDispatch } from "react-redux";
import { banUserFromRoom, unbanUserFromRoom } from "../../../api/Axios";

const ReceivedMessageCell = ({ conversation, room }) => {
  const [position, setPosition] = useState(-1);
  const theme = useTheme();
  const dispatch = useDispatch();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "30px",
        alignItems: "flex-end",
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      >
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
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginLeft: theme.spacing(3),
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: "1px 16px",
            borderRadius: theme.spacing(1, 1, 0, 1),
            maxWidth: "600px",
            fontSize: theme.typography.body1.fontSize,
            marginBottom: theme.spacing(1),
          }}
        >
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
        <Box
          sx={{
            fontSize: theme.typography.caption.fontSize,
            color: theme.palette.text.secondary,
          }}
        >
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
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
          <Box sx={{ p: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: theme.spacing(2),
              }}
            >
              <CustomAvatar
                src={conversation.sender.profile_picture}
                onClick={handleClick}
              />
              <Box
                sx={{
                  marginLeft: theme.spacing(2),
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.subtitle1.fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {conversation.sender.first_name +
                    " " +
                    conversation.sender.last_name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.text.secondary,
                  }}
                >
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
              <Box
                sx={{
                  marginTop: theme.spacing(3),
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    marginRight: theme.spacing(3),
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onBanClick}
                  >
                    Ban
                  </Button>
                </Box>
                <Box>
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
          <Box sx={{ p: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: theme.spacing(2),
              }}
            >
              <CustomAvatar
                src={conversation.profile_picture}
                onClick={handleClick}
              />
              <Box
                sx={{
                  marginLeft: theme.spacing(2),
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.subtitle1.fontSize,
                    fontWeight: "bold",
                  }}
                >
                  {conversation.first_name + " " + conversation.last_name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.palette.text.secondary,
                  }}
                >
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
              <Box
                sx={{
                  marginTop: theme.spacing(3),
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    marginRight: theme.spacing(3),
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onBanClick}
                  >
                    Ban
                  </Button>
                </Box>
                <Box>
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
