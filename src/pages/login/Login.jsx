import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일 적용
import { IoHome } from "react-icons/io5";
import { login } from "../../api/SignApi";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { token } = await login(email, password);
      if (token) {
        const decoded = jwtDecode(token);

        if (decoded.role === "ROLE_ADMIN") {
          setIsLoading(false);
          navigate("/padmin");
          return;
        }
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoginFail(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setIsLoginFail(true);
      setIsLoading(false);
    }
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
              type="text"
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
        {isLoginFail && (
          <div className="login-error-message">
            이메일 또는 비밀번호가 올바르지 않습니다.
          </div>
        )}

        <div className="login-links">
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
