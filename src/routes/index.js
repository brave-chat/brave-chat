import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChatFooter from "../components/ChatFooter";

const AppRoutes = () => {
  // TODO: implement redirect to chat if user if signed in

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
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
            path="/signup"
            element={
              <div className="signup">
                {<Register />}
                {/*lazy(() => import('../pages/Register'))*/}
              </div>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <div className="chat">
                {<ChatFooter />}
                {/*lazy(() => import('../pages/ChatFooter'))*/}
              </div>
            }
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
