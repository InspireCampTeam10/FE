import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일 적용
import { IoHome } from "react-icons/io5";
import { login } from "../../api/SignApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <span className="login-header-back" onClick={() => navigate("/")}>
            <IoHome size={20} />
          </span>
        </div>
        <h1>
          해외 축구 리포트를
          <br />
          AI로 받아보세요!
        </h1>
        <p className="login-subtitle">로그인을 진행해주세요.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-links">
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
