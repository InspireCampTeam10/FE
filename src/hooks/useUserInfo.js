import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserInfo = () => {
  const token = sessionStorage.getItem("access-token");
  const [isTokenExist, setIsTokenExist] = useState(token && true);
  const decoded = jwtDecode(token);
  const [username, setUsername] = useState(decoded.username);
  const [nickName, setNickName] = useState(decoded.nickname);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    navigate("/");
    setIsTokenExist(token && true);
  };

  const handleUpdateUsername = (updateUsername) => {
    setUsername(updateUsername);
  };

  const handleUpdateNickName = (updateNickName) => {
    setNickName(updateNickName);
  };

  return {
    token,
    isTokenExist,
    username,
    nickName,
    handleLogout,
    handleUpdateUsername,
    handleUpdateNickName,
  };
};
