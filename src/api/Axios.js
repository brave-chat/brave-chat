import {
  sendRoomMessage,
  sendChatMessage,
  sendNewMessageMedia,
  sendNewRoomMessageMedia,
  leaveRoomSocket,
  leaveContactSocket,
} from "./Socket";
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
  leaveRoom,
  deleteContact,
  setSearchData,
  addRoomToList,
  updateLoadUser,
  removeBannedUserConversation,
} from "../redux/appReducer/actions";
import { Server } from "../utils";

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
      .get(`${Server.endpoint}/contacts/chat/search`, {
        params: { search: search },
      })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setChatUsers(data.data.result));
        } else {
          dispatch(fetchError(""));
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
      .get(`${Server.endpoint}/contacts/users/search`, {
        params: { search: search },
      })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(setContactUsers(data.data.result));
        } else {
          dispatch(fetchError(""));
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
      .get(`${Server.endpoint}/rooms/search`, { params: { search: search } })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setRoomsUser(data.data.result));
        } else {
          dispatch(fetchError(""));
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
      .get(`${Server.endpoint}/conversation`, {
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
      .get(`${Server.endpoint}/room/conversation`, {
        params: { room: room.room_name },
      })
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
    dispatch(fetchStart());
    dispatch(sendChatMessage({ content: message, type: "text" }));
    dispatch(sendNewChatMessage(message));
    dispatch(fetchSuccess());
  };
};

export const banUserFromRoom = (user, roomName) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(
      sendRoomMessage({
        type: "ban",
        content: "ban",
        receiver: user.email,
        room_name: roomName,
      })
    );
    dispatch(removeBannedUserConversation(user.email));
    dispatch(fetchSuccess(`${user.first_name} has been banned!`));
  };
};

export const unbanUserFromRoom = (user, roomName) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(
      sendRoomMessage({
        type: "unban",
        content: "unban",
        receiver: user.email,
        room_name: roomName,
      })
    );
    dispatch(fetchSuccess(`${user.first_name} has been unbanned!`));
  };
};

export const sendNewMediaMessage = (
  receiverID,
  fileContent,
  fileName,
  preview
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(sendNewMessageMedia(fileContent, fileName, preview));
    dispatch(fetchSuccess());
  };
};

export const sendNewMediaRoomMessage = (
  room_name,
  fileContent,
  fileName,
  preview
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(sendNewRoomMessageMedia(fileContent, fileName, preview));
    dispatch(fetchSuccess());
  };
};

export const sendRoomTextMessage = (sender, room, message) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(sendRoomMessage({ content: message, type: "text" }));
    dispatch(sendNewChatMessageRoom(message));
    dispatch(fetchSuccess());
  };
};

export const removeRoom = (room_name, onRoomSelect) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .delete(`${Server.endpoint}/room`, { data: { room_name: room_name } })
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
          dispatch(leaveRoom(room_name));
          dispatch(leaveRoomSocket());
          axJson
            .get(`${Server.endpoint}/rooms/search`, { params: { search: "" } })
            .then((data) => {
              if (data.data.status_code === 200) {
                dispatch(fetchSuccess());
                dispatch(setRoomsUser(data.data.result));
              } else {
                dispatch(fetchError(""));
              }
            });
          dispatch(onRoomSelect(null));
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
    dispatch(fetchSuccess());
  };
};

export const deleteRoomConversation = (room, onRoomSelect) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .delete(`${Server.endpoint}/room/chat`, {
        data: { room_name: room.room_name },
      })
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
          dispatch(getRoomConversation(room));
          dispatch(onRoomSelect(null));
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
    dispatch(fetchSuccess());
  };
};

export const removeContact = (email, onUserSelect) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .delete(`${Server.endpoint}/contact/delete`, { data: { contact: email } })
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
          dispatch(deleteContact(email));
          dispatch(leaveContactSocket());
          dispatch(onUserSelect(null));
          axJson
            .get(`${Server.endpoint}/contacts/users/search`, {
              params: { search: "" },
            })
            .then((data) => {
              if (data.data.status_code === 200) {
                dispatch(setContactUsers(data.data.result));
              } else {
                dispatch(fetchError(""));
              }
            })
            .catch(function (error) {
              dispatch(fetchError(""));
            });
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
    dispatch(fetchSuccess());
  };
};

export const deleteMessages = (email, onUserSelect) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .delete(`${Server.endpoint}/user/chat`, { data: { contact: email } })
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
          dispatch(deleteContact(email));
          dispatch(leaveContactSocket());
          dispatch(onUserSelect(null));
          dispatch(getConversation(email));
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
    dispatch(fetchSuccess());
  };
};

export const addContactEmail = (email, onCloseDialog) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(`${Server.endpoint}/contact`, { contact: email })
      .then(({ data }) => {
        if (data.status_code === 201) {
          onCloseDialog();
          dispatch(fetchSuccess(data.message));
          axJson
            .get(`${Server.endpoint}/contacts/users/search`, {
              params: { search: "" },
            })
            .then((data) => {
              if (data.data.status_code === 200) {
                dispatch(setContactUsers(data.data.result));
              } else {
                dispatch(fetchError(""));
              }
            })
            .catch(function (error) {
              dispatch(fetchError(""));
            });
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const addRoom = (roomName, roomDescription, join, onCloseDialog) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(
        `${Server.endpoint}/room`,
        JSON.stringify({
          room_name: roomName,
          description: roomDescription,
          join: join,
        })
      )
      .then(({ data }) => {
        if (data.status_code === 200) {
          dispatch(fetchSuccess(data.message));
          dispatch(
            addRoomToList({ room_name: roomName, description: roomDescription })
          );
          onCloseDialog();
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
        .get(`${Server.endpoint}/contacts`, {
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
          dispatch(JWTAuth.onLogout());
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
        .get(`${Server.endpoint}/rooms`)
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
        .put(`${Server.endpoint}/user`, JSON.stringify({ chat_status: status }))
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

export const resetPassword = (
  oldPassword,
  newPassword,
  confirmPassword,
  onCloseDialog
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put(
          `${Server.endpoint}/user/reset-password`,
          JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(onCloseDialog());
            dispatch(JWTAuth.onLogout());
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
        .put(
          `${Server.endpoint}/contact/favourite`,
          JSON.stringify({ favourite: favourite })
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

export const uploadProfilePicture = (image) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    dispatch(fetchStart());
    const user = localStorage.getItem("user");
    if (user) {
      axFiles.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axFiles
        .put(`${Server.endpoint}/user/profile-image`, formData)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(
              JWTAuth.getAuthUser(true, data.access_token, data.message)
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

export const SetPersonalInfo = (
  { firstName, lastName, bio, phoneNumber },
  onCloseDialog
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put(
          `${Server.endpoint}/user/profile`,
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
            const user = JSON.parse(localStorage.getItem("user"));
            user.first_name = firstName;
            user.last_name = lastName;
            user.bio = bio;
            user.phone_number = phoneNumber;
            dispatch(setCurrentUser(user));
            dispatch(onCloseDialog());
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

// export const setUserChat = () => {
//   return (dispatch) => {
//     dispatch(fetchStart());
//     if (localStorage.getItem("user")) {
//       axJson.defaults.headers.common["Authorization"] =
//         "Bearer " + localStorage.getItem("token");
//       axJson
//         .get(`${Server.endpoint}/contacts/chat`, {
//           params: { user: JSON.parse(localStorage.getItem("user")).email },
//         })
//         .then(({ data }) => {
//           if (data.status_code === 200) {
//             dispatch(fetchSuccess());
//             dispatch(setChatUsers(data.result));
//           } else {
//             dispatch(fetchError(data.message));
//           }
//         })
//         .catch(function (error) {
//           dispatch(fetchError(""));
//         });
//     }
//   };
// };

export const JWTAuth = {
  onRegister: ({ firstName, lastName, email, password }) => {
    return (dispatch) => {
      dispatch(fetchStart());
      axJson
        .post(
          `${Server.endpoint}/auth/register`,
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
            `${Server.endpoint}/auth/login`,
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
                  "Welcome. Let's get chattin'"
                )
              );
            } else {
              dispatch(fetchError(data.message));
            }
          })
          .catch(function (error) {
            dispatch(fetchError(""));
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
        .get(`${Server.endpoint}/user/logout`)
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
          dispatch(fetchError(""));
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
        .get(`${Server.endpoint}/user/profile`)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(message));
            dispatch(updateLoadUser(true));
            dispatch(setCurrentUser(data.user));
            dispatch(setAuthUser(data.user));
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            dispatch(JWTAuth.onLogout());
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    };
  },
};
