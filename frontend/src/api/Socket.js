import {
  receiveNewChatMessageRoom,
  receiveNewChatMessage,
  fetchSuccess,
} from "../redux/appReducer/actions";

const SOCKET_URL = "ws://localhost:8000/ws";
let roomClient = null;
let chatClient = null;

export const initiateRoomSocket = (sender, room_name) => {
  return (dispatch) => {
    if (roomClient === null || roomClient.readyState === WebSocket.CLOSED) {
      roomClient = new WebSocket(
        `${SOCKET_URL}/${sender.pk}/${room_name}`
      );
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
      roomClient = new WebSocket(
        `${SOCKET_URL}/${sender.pk}/${room_name}`
      );
    };
    roomClient.onmessage = (event) => {
      let message = JSON.parse(event.data);
      let message_body = {
        user: message["user"],
        content: message["content"],
      };
      if (message["type"] === "entrance" && sender.pk !== message["user"].pk) {
        dispatch(fetchSuccess(message["content"]));
      } else if (message.hasOwnProperty("room_name")) {
        return;
      } else if (sender.pk !== message["user"].pk) {
        dispatch(receiveNewChatMessageRoom(message_body));
      }
    };
  };
};

export const initiateChatSocket = (sender, receiver) => {
  return (dispatch) => {
    if (chatClient === null || chatClient.readyState === WebSocket.CLOSED) {
      chatClient = new WebSocket(
        `${SOCKET_URL}/chat/${sender.pk}/${receiver.pk}`
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
        `${SOCKET_URL}/chat/${sender.pk}/${receiver.pk}`
      );
    };
    chatClient.onmessage = (event) => {
      let message = JSON.parse(event.data);
      let message_body = {
        user: sender,
        content: message["content"],
      };
      if (message["type"] === "open" && message["user"].pk !== sender.pk) {
        dispatch(fetchSuccess(message["content"]));
      } else if (message["user"].pk !== sender.pk) {
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
