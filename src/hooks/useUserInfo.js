import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store/HistoryStore";

export const useUserInfo = () => {
  const token = sessionStorage.getItem("access-token");
  const [isTokenExist, setIsTokenExist] = useState(token && true);
  const decoded = jwtDecode(token);
  const { username, nickname, imgUrl, role } = decoded;
  const [upNickName, setUpNickName] = useState(nickname);
  const navigate = useNavigate();
  const { resetHistory } = useHistoryStore();

  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    resetHistory();
    navigate("/");
    setIsTokenExist(token && true);
  };

  const handleUpdateNickName = (updateNickName) => {
    setUpNickName(updateNickName);
  };

  return {
    token,
    isTokenExist,
    username,
    nickname,
    imgUrl,
    upNickName,
    role,
    handleLogout,
    handleUpdateNickName,
  };
};
