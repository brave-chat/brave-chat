import moment from "moment";
import {
  SEND_NEW_CHAT_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE,
  SET_CHAT_USERS,
  SET_CONTACT_USERS,
  SET_ROOMS_USER,
  SET_SELECTED_USER_ROOM,
  SET_CONVERSATION_DATA,
  SET_ROOM_CONVERSATION_DATA,
  RECEIVE_NEW_ROOM_MEDIA_MESSAGE,
  RECEIVE_NEW_MEDIA_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE_ROOM,
  SEND_NEW_CHAT_MESSAGE_ROOM,
  RECEIVE_NEW_CHAT_MESSAGE_ROOM,
  RECEIVE_NEW_CHAT_MESSAGE,
  SET_CURRENT_USER,
  SET_SEARCH_DATA,
  SET_SELECTED_USER,
  UPDATE_AUTH_USER,
  ADD_ROOM_TO_LIST,
  UPDATE_LOAD_USER,
  LEAVE_ROOM,
  BAN_USER_FROM_ROOM,
  DELETE_CONTACT,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "../../constants/ActionTypes";

const initialState = {
  users: [],
  contacts: [],
  conversation: [],
  roomConversation: [],
  rooms: [],
  currentUser: null,
  selectedUser: null,
  selectedRoom: null,
  authUser: "",
  loadUser: false,
  search: "",
  error: "",
  message: "",
  loading: false,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_USERS: {
      return { ...state, users: action.payload };
    }
    case SET_CONTACT_USERS: {
      return { ...state, contacts: action.payload };
    }
    case SET_ROOMS_USER: {
      return { ...state, rooms: action.payload };
    }
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    case SET_SELECTED_USER: {
      return { ...state, selectedUser: action.payload };
    }
    case SET_SELECTED_USER_ROOM: {
      return { ...state, selectedRoom: action.payload };
    }
    case SET_CONVERSATION_DATA: {
      return {
        ...state,
        conversation: action.payload,
      };
    }
    case SET_ROOM_CONVERSATION_DATA: {
      return {
        ...state,
        roomConversation: action.payload,
      };
    }
    case LEAVE_ROOM: {
      const room = state.rooms.find(
        (room) => room.room_name === action.payload
      );
      const index = state.rooms.indexOf(room);
      state.rooms.splice(index, 1);
      return {
        ...state,
        rooms: state.rooms,
      };
    }
    case DELETE_CONTACT: {
      const contact = state.contacts.find(
        (contact) => contact.email === action.payload
      );
      const index = state.contacts.indexOf(contact);
      state.contacts.splice(index, 1);
      return {
        ...state,
        contacts: state.contacts,
      };
    }
    case BAN_USER_FROM_ROOM: {
      if (state.roomConversation.sender) {
        state.roomConversation.forEach((conversation, i) => {
          if (conversation.sender.email === action.payload)
            state.roomConversation[i].content = "<em>Deleted Message!</em>";
        });
      } else {
        state.roomConversation.forEach((conversation, i) => {
          if (conversation.email === action.payload)
            state.roomConversation[i].content = "<em>Deleted Message!</em>";
        });
      }
      return {
        ...state,
        roomConversation: state.roomConversation,
      };
    }
    case ADD_ROOM_TO_LIST: {
      return {
        ...state,
        rooms: state.rooms.concat(action.payload),
      };
    }
    case SEND_NEW_CHAT_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          content: action.payload,
          type: "sent",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_CHAT_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: action.payload.user,
          content: action.payload.content,
          type: "received",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case SEND_NEW_CHAT_MESSAGE_ROOM: {
      return {
        ...state,
        roomConversation: state.roomConversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          content: action.payload,
          type: "sent",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_CHAT_MESSAGE_ROOM: {
      return {
        ...state,
        roomConversation: state.roomConversation.concat({
          id: new Date().getTime(),
          sender: action.payload.user,
          content: action.payload.content,
          type: "received",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case SEND_NEW_MEDIA_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          type: "sent",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_MEDIA_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          type: "received",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case SEND_NEW_MEDIA_MESSAGE_ROOM: {
      return {
        ...state,
        roomConversation: state.roomConversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          type: "sent",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_ROOM_MEDIA_MESSAGE: {
      return {
        ...state,
        roomConversation: state.roomConversation.concat({
          id: new Date().getTime(),
          sender: action.payload.user,
          type: "received",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case SET_SEARCH_DATA: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: "", loading: false, message: action.payload };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, message: "", error: action.payload };
    }
    default:
      return state;
  }
};

export default appReducer;
