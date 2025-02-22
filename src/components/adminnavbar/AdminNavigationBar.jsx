import { useNavigate } from "react-router-dom";
import "./AdminNavigationBar.css";

const AdminNavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-nav-wrapper">
      <div className="admin-nav-title">Admin</div>
      <div className="admin-nav-content-container">
        <div
          className="admin-nav-content-item"
          onClick={() => navigate("/admin")}
        >
          Home
        </div>
        <div
          className="admin-nav-content-item"
          onClick={() => navigate("/admin/manage-league")}
        >
          리그 관리
        </div>
      </div>
    </div>
  );
};

export default AdminNavigationBar;
