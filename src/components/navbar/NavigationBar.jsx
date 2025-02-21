import { useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { FiHome } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import LightMode from "./LightMode";
import { homeStore } from "../../store/HomeStore";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = homeStore();

  return (
    <div className="navigation-bar-container">
      <div className="navigation-bar-content">
        <div
          className="navigation-bar-tab"
          onClick={() => {
            if (location.pathname === "/") {
              navigate(0);
              return;
            }
            navigate("/", { replace: true });
            reset();
          }}
        >
          <FiHome />
          <span>Home</span>
        </div>
        <div
          className="navigation-bar-tab"
          onClick={() => navigate("/history")}
        >
          <IoNewspaperOutline />
          <span>History</span>
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
