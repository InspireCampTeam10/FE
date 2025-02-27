import { useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { FiHome } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (target) => location.pathname === target;
  const token = sessionStorage.getItem("access-token");

  return (
    <div className="nav-wrapper">
      <div className="nav-main-tab-container">
        <img
          className="nav-main-tab-logo"
          src="/ApplicationLogo.png"
          onClick={() => navigate("/")}
        />
        <div
          className={`nav-main-tab-item ${isActive("/") ? "active" : ""}`}
          onClick={() => {
            if (location.pathname === "/") {
              navigate(0);
              return;
            }
            navigate("/", { replace: true });
          }}
        >
          <FiHome />
          <span>Home</span>
        </div>
        <div
          className={`nav-main-tab-item ${isActive("/history") ? "active" : ""}`}
          onClick={() => navigate("/history")}
        >
          <IoNewspaperOutline />
          <span>History</span>
        </div>
      </div>
      <div className="nav-sys-tab-container">
        <div
          className="nav-sys-tab-item"
          onClick={() => {
            if (token && token !== "undefined") {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
        >
          <FaRegUserCircle />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
