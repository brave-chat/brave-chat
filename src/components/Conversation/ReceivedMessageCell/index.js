import React, { useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";
import "../style.css";
import clsx from "clsx";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";
import TextToHtml from "../../TextToHtml";

const ReceivedMessageCell = ({ conversation, user }) => {
  const [position, setPosition] = useState(-1);
  const handleClose = () => {
    setPosition(-1);
  };
  return (
    <Box className={clsx("chat-msg-item", "received-msg-item")}>
      <Box className="chat-avatar">
        <CustomAvatar src={user.profile_picture} alt={user.first_name} />
      </Box>
      <Box className="chat-msg-content">
        <Box className={clsx("chat-bubble", "receive-bubble")}>
          {conversation.message_type === "text" ? (
            <TextToHtml content={conversation.content} />
          ) : typeof conversation.media === "string" &&
            conversation.message_type === "media" ? (
            <Box>
              <CustomImage
                key={conversation.pk}
                src={`http://localhost:8000/api/v1/${conversation.media}`}
                alt={"image"}
                height={100}
                width={100}
              />

              <MediaViewer
                position={position}
                medias={[`http://localhost:8000/api/v1/${conversation.media}`]}
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
    </Box>
  );
};

export default ReceivedMessageCell;
