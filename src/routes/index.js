import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useSelector } from "react-redux";
import ChatApp from "../pages/ChatApp";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingPage from "../pages/LandingPage";
import { useDispatch } from "react-redux";
import { setCurrentUser, setAuthUser } from "../redux/appReducer/actions";

import { getUserContacts, getUserRooms } from "../api/Axios";
import { authUser } from "../redux/appReducer/selectors";

const AppRoutes = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(useSelector(authUser));
  const location = useLocation();
  const dispatch = useDispatch();

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
    <>
      <Suspense fallback={<PageLoader />}>
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
                {/*<ChatApp />*/}
                {currentAuthUser ? (
                  <ChatApp />
                ) : (
                  <Navigate to={"/login"} replace />
                )}
                {/*lazy(() => import('../pages/ChatApp'))*/}
              </div>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <div className="signup">
                {<Register />}
                {/*lazy(() => import('../pages/Register'))*/}
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <div className="login">
                {<Login />}
                {/*lazy(() => import('../pages/Login'))*/}
              </div>
            }
          ></Route>
          <Route
            element={
              <div className="page-404">
                {lazy(() => import("../pages/PageNotFound"))}
              </div>
            }
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
