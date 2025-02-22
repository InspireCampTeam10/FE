import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import AdminNavigationBar from "../components/adminnavbar/AdminNavigationBar";

const AdminLayout = () => {
  return (
    <div className="admin-layout-wrapper">
      <div className="admin-layout-navigation">
        <AdminNavigationBar />
      </div>
      <div className="admin-layout-content">
        <div className="admin-header">
          <div className="header-hello">@@@님 안녕하세요</div>
          <div className="header-login">로그인</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
