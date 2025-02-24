import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import AdminNavigationBar from "../components/adminnavbar/AdminNavigationBar";
import { useUserInfo } from "../hooks/useUserInfo";

const AdminLayout = () => {
  const { nickName, handleLogout } = useUserInfo();

  return (
    <div className="admin-layout-wrapper">
      <div className="admin-layout-navigation">
        <AdminNavigationBar />
      </div>
      <div className="admin-layout-content">
        <div className="admin-header">
          <div className="header-hello">{nickName}님 안녕하세요</div>
          <div className="header-logout" onClick={handleLogout}>
            로그아웃
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
