import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { FiHome } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import LightMode from "./LightMode";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation-bar-container">
      <div className="navigation-bar-content">
        <div className="navigation-bar-tab" onClick={() => navigate("/")}>
          <FiHome />
          <span>Home</span>
        </div>
        <div
          className="navigation-bar-tab"
          onClick={() => navigate("/fit-news")}
        >
          <IoNewspaperOutline />
          <span>Fit News</span>
        </div>
      </div>
      <div className="navigation-bar-system">
        <LightMode />
        <div
          className="navigation-bar-login-tab"
          onClick={() => navigate("/login")}
        >
          <FaRegUserCircle />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
