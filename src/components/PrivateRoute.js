import { Navigate, Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

const PrivateRoutes = () => {
  return localStorage.getItem("token") ? (
    <>
      {/* <div className="container-fluid dashboardMain vh-100 bg-light">
        <div className="row mainInner h-100"> */}
           <Navigation/>
          <Outlet />
        {/* </div>
      </div> */}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;