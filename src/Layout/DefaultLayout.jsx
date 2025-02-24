import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navbar/NavigationBar";
import "./DefaultLayout.css";

const DefaultLayout = () => {
  return (
    <div className="default-layout-container">
      <div className="default-layout-navigation">
        <NavigationBar />
      </div>
      <div className="default-layout-contents">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
