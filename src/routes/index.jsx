import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, setAuthUser } from "../redux/appReducer/actions";

import { getUserContacts, getUserRooms } from "../api/Axios";
import { authUser, selectedTheme } from "../redux/appReducer/selectors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2", // Dark Blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF9100", // Orange
      contrastText: "#fff",
    },
    error: {
      main: "#FF5252", // Red
    },
    warning: {
      main: "#FFC107", // Amber
    },
    info: {
      main: "#2196F3", // Blue
    },
    success: {
      main: "#4CAF50", // Green
    },
    text: {
      primary: "#000",
      secondary: "#666666",
    },
    background: {
      primary: "#ffffff",
      default: "#ffffff", // White
      paper: "#f5f5f5", // Light Gray
      chatFooter: "#ffffff",
      chatHeader: "#f5f5f5",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976D2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF9100",
      contrastText: "#fff",
    },
    error: {
      main: "#FF5252",
    },
    warning: {
      main: "#FFC107",
    },
    info: {
      main: "#2196F3",
    },
    success: {
      main: "#4CAF50",
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#aaaaaa", // Light Gray
    },
    background: {
      primary: "#000000",
      default: "#2d2b2b", // Dark Gray
      paper: "#1f1f1f", // Slightly Lighter Dark Gray
      chatFooter: "#171616",
      chatHeader: "#171616",
    },
  },
});

const AppRoutes = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(useSelector(authUser));
  const themeMode = useSelector(selectedTheme);
  const [mode, setMode] = useState("dark");
  const LandingPage = lazy(() => import("../pages/LandingPage"));
  const Login = lazy(() => import("../pages/Login"));
  const Register = lazy(() => import("../pages/Register"));
  const ChatApp = lazy(() => import("../pages/ChatApp"));
  const PageNotFound = lazy(() => import("../pages/PageNotFound"));
  const InviteRoomPage = lazy(() => import("../pages/InviteRoomPage"));
  const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
  const location = useLocation();
  const dispatch = useDispatch();
  const rootElement = document.getElementById("root");

  if (themeMode === "light") {
    rootElement.style.backgroundColor = "#2d2b2b";
  } else if (themeMode === "dark") {
    rootElement.style.backgroundColor = "#ffffff";
  }

  useEffect(() => {
    if (themeMode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [themeMode]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentAuthUser(user);
      dispatch(setCurrentUser(user));
      dispatch(setAuthUser(user));
      dispatch(getUserContacts());
      dispatch(getUserRooms());
      //dispatch(setUserChat());
    }
    // eslint-disable-next-line
  }, [dispatch, localStorage.getItem("user")]);

  if (currentAuthUser && location.pathname === "/login") {
    dispatch(setCurrentUser(currentAuthUser));
    dispatch(getUserContacts());
    dispatch(getUserRooms());
    //dispatch(setUserChat());
    return (
      <>
        <Navigate to={"/chat"} replace />
      </>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/landing" />}
          ></Route>
          <Route
            path="/landing"
            element={<div className="landing">{<LandingPage />}</div>}
          ></Route>
          <Route
            path="/chat"
            element={
              <div className="chat">
                {currentAuthUser ? (
                  <ChatApp />
                ) : (
                  <Navigate to={"/login"} replace />
                )}
              </div>
            }
          ></Route>
          <Route
            path="/signup"
            element={<div className="signup">{<Register />}</div>}
          ></Route>
          <Route
            path="/login"
            element={<div className="login">{<Login />}</div>}
          ></Route>
          <Route
            element={<div className="page-404">{<PageNotFound />}</div>}
          ></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/chat/:uuid/:uuid" element={<InviteRoomPage />}></Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
};

export default AppRoutes;
