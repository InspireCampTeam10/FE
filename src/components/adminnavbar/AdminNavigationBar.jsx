import { useLocation, useNavigate } from "react-router-dom";
import "./AdminNavigationBar.css";

const AdminNavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="admin-nav-wrapper">
      <div className="admin-nav-title">Admin</div>
      <div className="admin-nav-content-container">
        <div
          className={`admin-nav-content-item ${currentPath === "/padmin" ? "active" : ""}`}
          onClick={() => {
            if (currentPath !== "/padmin") {
              navigate("/padmin");
            }
          }}
        >
          Home
        </div>
        <div
          className={`admin-nav-content-item ${currentPath === "/padmin/manage-league" ? "active" : ""}`}
          onClick={() => {
            if (currentPath !== "/padmin/manage-league") {
              navigate("/padmin/manage-league");
            }
          }}
        >
          리그 관리
        </div>
      </div>
    </div>
  );
};

export default AdminNavigationBar;
