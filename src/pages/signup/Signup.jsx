import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { signUp } from "../../api/SignApi";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNickname, setUserNickName] = useState("");
  const isConfirm = password === confirmPassword;
  const [isConfirmMsg, setIsConfirmMsg] = useState(false);
  const [isSuccessSignUp, setIsSuccessSignUp] = useState(false);
  const [signUpMsg, setSignUpMsg] = useState("");

  const isActive =
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    userNickname !== "";

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isConfirm) {
      setIsConfirmMsg(true);
      return;
    }
    const { isSuccess, message } = await signUp(email, password, userNickname);
    setIsSuccessSignUp(isSuccess);
    setSignUpMsg(message);

    if (!isSuccess) {
      return;
    }

    navigate("/");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1>회원가입</h1>
        <p>회원가입을 진행해주세요.</p>

        <form onSubmit={handleSignup}>
          <div className="input-group">
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
            <label htmlFor="email">아이디</label>
            <input
              type="text"
              id="email"
              placeholder="아이디를 입력해주세요"
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
            <div className="sign-up-no-confirm">
              {isConfirmMsg && (
                <span>비밀번호가 일치하는지 다시 확인해주세요</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`signup-button ${isActive ? "active" : ""}`}
          >
            회원가입 완료
          </button>
        </form>
        <div className="sign-up-deny-msg">
          {!isSuccessSignUp && <span>{signUpMsg}</span>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
