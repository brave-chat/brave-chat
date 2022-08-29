import {
  SEND_NEW_CHAT_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE,
  SET_CHAT_USERS,
  SET_SEARCH_DATA,
  SET_CONTACT_USERS,
  SET_ROOMS_USER,
  SET_SELECTED_USER_ROOM,
  SEND_NEW_CHAT_MESSAGE_ROOM,
  RECEIVE_NEW_CHAT_MESSAGE_ROOM,
  RECEIVE_NEW_CHAT_MESSAGE,
  SET_CONVERSATION_DATA,
  SET_ROOM_CONVERSATION_DATA,
  SET_CURRENT_USER,
  SET_SELECTED_USER,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "../../../constants/ActionTypes";

export const fetchSuccess = (message) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || "",
    });
  };
};
export const fetchError = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START,
    });
  };
};

export const onUserSelect = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_USER,
      payload: user,
    });
  };
};

export const onRoomSelect = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_USER_ROOM,
      payload: user,
    });
  };
};

export const setCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};
export const setSearchData = (search) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_DATA,
      payload: search,
    });
  };
};

export const sendNewChatMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: SEND_NEW_CHAT_MESSAGE,
      payload: message,
    });
  };
};

export const sendNewChatMessageRoom = (message) => {
  return (dispatch) => {
    dispatch({
      type: SEND_NEW_CHAT_MESSAGE_ROOM,
      payload: message,
    });
  };
};

export const receiveNewChatMessageRoom = (data) => {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_NEW_CHAT_MESSAGE_ROOM,
      payload: data,
    });
  };
};
export const receiveNewChatMessage = (data) => {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_NEW_CHAT_MESSAGE,
      payload: data,
    });
  };
};

export const sendMediaMessage = (file) => {
  return (dispatch) => {
    dispatch({
      type: SEND_NEW_MEDIA_MESSAGE,
      payload: file,
    });
  };
};

// export const uploadImage = (image) => {
//   return (dispatch) => {
//     dispatch({
//       type: SEND_NEW_MEDIA_MESSAGE,
//       payload: image,
//     });
//   };
// };

export const setChatUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_USERS,
      payload: data,
    });
  };
};

export const setContactUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CONTACT_USERS,
      payload: data,
    });
  };
};

export const setRoomsUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_ROOMS_USER,
      payload: data,
    });
  };
};

export const setConversation = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CONVERSATION_DATA,
      payload: data,
    });
  };
};

export const setRoomConversation = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_ROOM_CONVERSATION_DATA,
      payload: data,
    });
  };
};

export const setAuthUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = (loading) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};
