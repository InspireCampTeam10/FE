import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일 적용

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });

    // 로그인 성공 시 홈으로 이동
    navigate("/");
  };


return (
  <div className="login-wrapper">
    <div className="login-container">
      <h1>스포츠 정보를<br />무료로 즐기세요!</h1>
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

        <button type="submit" className="login-button">로그인</button>
      </form>

      <div className="login-links">
        <a href="/signup">회원가입</a>
        <a href="/find-id">아이디 찾기</a>
        <a href="/find-password">비밀번호 찾기</a>
      </div>


              {/*  하단 정책 링크 */}
              <footer className="login-footer">
          <a href="#">개인정보처리방침</a>
          <a href="#">이용약관</a>
        </footer>
      </div>
    </div>
  );
};

export default Login;