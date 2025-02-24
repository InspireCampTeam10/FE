import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
<<<<<<< HEAD

const Signup = () => {
=======
import { signUp } from "../../api/SignApi";

const SignUp = () => {
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
<<<<<<< HEAD

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("회원가입 완료:", { email, password });

    // 회원가입 완료 후 프로필 페이지로 이동
    navigate("/profile");
=======
  const [userNickname, setUserNickName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await signUp(email, password, userNickname);
    navigate("/");
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1>회원가입</h1>
        <p>회원가입을 진행해주세요.</p>

        <form onSubmit={handleSignup}>
          <div className="input-group">
<<<<<<< HEAD
=======
            <label htmlFor="nickname">별명</label>
            <input
              type="text"
              id="nickName"
              placeholder="별명을 입력해주세요"
              value={userNickname}
              onChange={(e) => setUserNickName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
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

          <div className="input-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

<<<<<<< HEAD
          <button type="submit" className="signup-button">회원가입 완료</button>
=======
          <button type="submit" className="signup-button">
            회원가입 완료
          </button>
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
        </form>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Signup;
=======
export default SignUp;
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
