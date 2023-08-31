import React, { useState } from "react";
import moment from "moment";
import { Box, useTheme } from "@mui/material";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";
import { Server } from "../../../utils";

const ReceivedMessageCell = ({ conversation, user }) => {
  const [position, setPosition] = useState(-1);
  const theme = useTheme();

  const handleClose = () => {
    setPosition(-1);
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
        sx={{
          position: "relative",
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      >
        <CustomAvatar src={user.profile_picture} alt={user.first_name} />
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
                medias={{
                  preview: conversation.media.preview,
                  name: "image",
                }}
                handleClose={handleClose}
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            fontSize: theme.typography.caption.fontSize,
            color: theme.palette.text.primary,
            letterSpacing: "0.4px",
          }}
        >
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
    </Box>
  );
};

export default ReceivedMessageCell;
