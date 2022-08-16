import React, { lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Login from "../pages/Login";

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
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
