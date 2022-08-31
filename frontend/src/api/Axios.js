import { sendRoomMessage, sendChatMessage } from "./Socket";
import { axiosUrlEncoded, axiosJson, axiosFiles } from "./AxiosConfig";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  sendNewChatMessage,
  sendNewChatMessageRoom,
  setAuthUser,
  setChatUsers,
  setContactUsers,
  setConversation,
  setCurrentUser,
  setRoomConversation,
  setRoomsUser,
  setSearchData,
  updateLoadUser,
} from "../redux/appReducer/actions";
var axUrlEncoded = axiosUrlEncoded();
var axJson = axiosJson();
var axFiles = axiosFiles();

export const getChatUsers = (search = "") => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(setSearchData(search));
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get("/contacts/chat/search", { params: { search: search } })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setChatUsers(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const getContactUsers = (search = "") => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(setSearchData(search));
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get("/contacts/users/search", { params: { search: search } })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setContactUsers(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const getRoomsUser = (search = "") => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(setSearchData(search));
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get("/rooms/search", { params: { search: search } })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setRoomsUser(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const getConversation = (receiver) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get("/conversation", {
        params: {
          sender: JSON.parse(localStorage.getItem("user")).email,
          receiver: receiver.email,
        },
      })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setConversation(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
          dispatch(setConversation([]));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
        dispatch(setConversation([]));
      });
  };
};

export const getRoomConversation = (room) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get("/room/conversation", { params: { room: room.room_name } })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch(setRoomConversation(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
          dispatch(setRoomConversation([]));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
        dispatch(setRoomConversation([]));
      });
  };
};

export const sendTextMessage = (sender, receiver, message) => {
  return (dispatch) => {
    dispatch(sendChatMessage(message));
    dispatch(fetchStart());
    dispatch(sendNewChatMessage(message));
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(
        "/message",
        JSON.stringify({
          sender: sender.email,
          receiver: receiver.email,
          content: message,
          message_type: "text",
          media: "",
        })
      )
      .then(({ data }) => {
        if (data.status_code === 201) {
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const sendNewMediaMessage = (receiverPk, file) => {
  return (dispatch) => {
    // [
    //   preview: URL.createObjectURL(file),
    //   name: file.name,
    //   ...file,
    //   metaData: { type: file.type, size: file.size },
    // ]
    const formData = new FormData();
    formData.append("file", file);
    //formData.append("receiver", receiver.pk)
    dispatch(fetchStart());
    axFiles.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axFiles
      .post(`/message/media/${receiverPk}`, formData)
      .then(({ data }) => {
        if (data.status_code === 201) {
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const sendRoomTextMessage = (sender, room, message) => {
  return (dispatch) => {
    dispatch(sendRoomMessage({ content: message, type: "sent" }));
    dispatch(sendNewChatMessageRoom(message));
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(
        "/room/message",
        JSON.stringify({
          receiver: room.room_name,
          content: message,
          message_type: "text",
          media: "",
        })
      )
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const addContactEmail = (email) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post("/contact", { contact: email })
      .then(({ data }) => {
        if (data.status_code === 201) {
          dispatch(fetchSuccess(data.message));
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const addRoom = (roomName, roomDescription) => {
  return (dispatch) => {
    dispatch(fetchError(""));
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(
        "/room",
        JSON.stringify({ room_name: roomName, description: roomDescription })
      )
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const getUserContacts = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .get("/contacts", {
          params: { user: JSON.parse(localStorage.getItem("user")).email },
        })
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess());
            dispatch(setContactUsers(data.result));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const getUserRooms = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .get("/rooms")
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess());
            dispatch(setRoomsUser(data.result));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const setCurrentUserStatus = (status) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put("/user", JSON.stringify({ chat_status: status }))
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(
              JWTAuth.getAuthUser(
                true,
                localStorage.getItem("token"),
                data.message
              )
            );
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const setFavourite = (favourite) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put("/contact/favourite", JSON.stringify({ favourite: favourite }))
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(
              JWTAuth.getAuthUser(
                true,
                localStorage.getItem("token"),
                data.message
              )
            );
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const uploadProfilePicture = (image) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axFiles.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axFiles
        .put("/user/profile-image", formData)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(
              JWTAuth.getAuthUser(true, localStorage.getItem("token"), "")
            );
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const SetPersonalInfo = ({ firstName, lastName, bio, phoneNumber }) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put(
          "/user/profile",
          JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            bio: bio,
            phone_number: phoneNumber,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(
              JWTAuth.getAuthUser(
                true,
                localStorage.getItem("token"),
                data.message
              )
            );
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const setUserChat = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .get("/contacts/chat", {
          params: { user: JSON.parse(localStorage.getItem("user")).email },
        })
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess());
            dispatch(setChatUsers(data.result));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const JWTAuth = {
  onRegister: ({ firstName, lastName, email, password }) => {
    return (dispatch) => {
      dispatch(fetchStart());
      axJson
        .post(
          "auth/register",
          JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 201) {
            localStorage.setItem("token", data.token.value);
            axJson.defaults.headers.common["Authorization"] =
              "Bearer " + data.token.value;
            dispatch(fetchSuccess(data.message));
            //dispatch(JWTAuth.getAuthUser(true, data.token.value));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    };
  },
  onLogin: ({ email, password }) => {
    return (dispatch) => {
      try {
        dispatch(fetchStart());
        axUrlEncoded
          .post(
            "auth/login",
            JSON.stringify(
              `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            )
          )
          .then(({ data }) => {
            if (data.access_token) {
              localStorage.setItem("token", data.access_token);
              axJson.defaults.headers.common["Authorization"] =
                "Bearer " + data.access_token;
              dispatch(fetchSuccess());
              dispatch(
                JWTAuth.getAuthUser(
                  true,
                  data.access_token,
                  "Welcome to this blazingly fast chat app!"
                )
              );
            } else {
              dispatch(fetchError(data.message));
            }
          })
          .catch(function (error) {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(""));
      }
    };
  },
  onLogout: () => {
    return (dispatch) => {
      localStorage.clear();
      dispatch(fetchStart());
      axJson
        .get("user/logout")
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(setAuthUser(null));
            dispatch(setCurrentUser(null));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  getAuthUser: (loaded = false, token, message) => {
    return (dispatch) => {
      if (!token) {
        const token = localStorage.getItem("token");
        axiosJson.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axJson
        .get("user/profile")
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(message));
            dispatch(updateLoadUser(true));
            dispatch(setAuthUser(data.user));
            dispatch(setCurrentUser(data.user));
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            dispatch(updateLoadUser(true));
          }
        })
        .catch(function (error) {
          dispatch("");
        });
    };
  },
};
