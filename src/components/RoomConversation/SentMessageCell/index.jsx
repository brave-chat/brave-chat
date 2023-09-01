import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import moment from "moment";
import CustomImage from "../../CustomImage";
import MediaViewer from "../../MediaViewer";
import { Server } from "../../../utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";

const SentMessageCell = ({ conversation }) => {
  const [position, setPosition] = useState(-1);
  const theme = useTheme();

  const handleClose = () => {
    setPosition(-1);
  };

  return (
    <Box
      sx={{
        padding: "0px 20px",
        marginTop: "30px",
        display: "flex",
        marginRight: theme.spacing(3),
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "24px",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: "1px 16px",
            borderRadius: "8px 8px 0 8px",
            maxWidth: "600px",
            fontSize: "16px",
            marginBottom: "8px",
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
            fontSize: "12px",
            letterSpacing: "0.4px",
            color: theme.palette.text.primary,
          }}
        >
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
    </Box>
  );
};

export default SentMessageCell;
