import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import AdminNavigationBar from "../components/adminnavbar/AdminNavigationBar";
import { useUserInfo } from "../hooks/useUserInfo";
import { useEffect } from "react";

const AdminLayout = () => {
  const { nickname, role, handleLogout } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      alert("관리자만 접근 가능한 페이지입니다.");
      navigate("/");
    }
  }, [role, navigate]);

  if (role !== "ROLE_ADMIN") {
    return null;
  }

  return (
    <div className="admin-layout-wrapper">
      <div className="admin-layout-navigation">
        <AdminNavigationBar />
      </div>
      <div className="admin-layout-content">
        <div className="admin-header">
          <div className="header-hello">{nickname} 님 안녕하세요</div>
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
