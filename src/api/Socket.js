import {
  receiveNewChatMessageRoom,
  receiveNewChatMessage,
  fetchSuccess,
  receiveMediaMessage,
  receiveRoomMediaMessage,
} from "../redux/appReducer/actions";

import { Server } from "../utils";

const SOCKET_URL = Server.socketEndpoint;
let roomClient = null;
let chatClient = null;

export const initiateRoomSocket = (sender, room_name) => {
  return (dispatch) => {
    if (roomClient === null || roomClient.readyState === WebSocket.CLOSED) {
      roomClient = new WebSocket(`${SOCKET_URL}/${sender.id}/${room_name}`);
    }
    roomClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    roomClient.onclose = () => {
      console.log("Websocket Disconnected");
    };
    roomClient.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      roomClient.close();
      roomClient = new WebSocket(`${SOCKET_URL}/${sender.id}/${room_name}`);
    };
    roomClient.onmessage = (event) => {
      let message = JSON.parse(JSON.parse(event.data));
      if (
        (message["type"] === "online" || message["type"] === "offline") &&
        sender.id !== message["user"].id
      ) {
        dispatch(fetchSuccess(message["content"]));
      } else if (
        (message["type"] === "ban" || message["type"] === "unban") &&
        message["user"].id !== sender.id
      ) {
        roomClient.close();
        window.location.reload();
      } else if (
        message["type"] === "media" &&
        message["user"].id !== sender.id
      ) {
        dispatch(receiveRoomMediaMessage(message));
      } else if (message.hasOwnProperty("room_name")) {
        return;
      } else if (sender.id !== message["user"].id) {
        dispatch(receiveNewChatMessageRoom(message));
      }
    };
  };
};

export const initiateChatSocket = (sender, receiver) => {
  return (dispatch) => {
    if (chatClient === null || chatClient.readyState === WebSocket.CLOSED) {
      chatClient = new WebSocket(
        `${SOCKET_URL}/chat/${sender.id}/${receiver.id}`
      );
    }
    chatClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    chatClient.onclose = () => {
      console.log("Websocket Disconnected");
    };
    chatClient.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      chatClient.close();
      chatClient = new WebSocket(
        `${SOCKET_URL}/chat/${sender.id}/${receiver.id}`
      );
    };
    chatClient.onmessage = (event) => {
      let message = JSON.parse(JSON.parse(event.data));
      let message_body = {
        user: message["user"],
        content: message["content"],
      };
      if (
        (message["type"] === "online" || message["type"] === "offline") &&
        message["user"].id !== sender.id
      ) {
        dispatch(fetchSuccess(message["content"]));
      } else if (
        message["type"] === "media" &&
        message["user"].id !== sender.id
      ) {
        dispatch(receiveMediaMessage(message["media"]));
      } else if (message["user"].id !== sender.id) {
        dispatch(receiveNewChatMessage(message_body));
      }
    };
  };
};

export const sendRoomMessage = (message) => {
  return (dispatch) => {
    if (!roomClient) {
      return;
    }
    roomClient.send(JSON.stringify(message));
  };
};

export const sendChatMessage = (message) => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(JSON.stringify(message));
  };
};

export const sendNewMessageMedia = (fileContent, fileName, preview) => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(
      JSON.stringify({
        content: fileContent.split(",")[1],
        file_name: fileName,
        type: "media",
        preview: preview,
      })
    );
  };
};

export const sendNewRoomMessageMedia = (fileContent, fileName, preview) => {
  return (dispatch) => {
    if (!roomClient) {
      return;
    }
    roomClient.send(
      JSON.stringify({
        content: fileContent.split(",")[1],
        file_name: fileName,
        type: "media",
        preview: preview,
      })
    );
  };
};

export const leaveRoomSocket = () => {
  return (dispatch) => {
    if (!roomClient) {
      return;
    }
    roomClient.send(JSON.stringify({ content: "leave", type: "leave" }));
  };
};

export const leaveContactSocket = () => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(JSON.stringify({ content: "leave", type: "leave" }));
  };
};
