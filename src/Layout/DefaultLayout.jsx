import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navbar/NavigationBar";
import "./DefaultLayout.css";

const DefaultLayout = () => {
  return (
    <div className="default-layout-container">
      <NavigationBar />
      <main className="default-layout-contents">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
