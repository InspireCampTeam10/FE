import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
<<<<<<< HEAD
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [accountId, setAccountId] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleStart = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    if (username && accountId) {
      console.log("프로필 설정 완료! 홈으로 이동합니다.");
      navigate("/");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2>프로필 설정</h2>
        <p>나중에 언제든지 변경할 수 있습니다.</p>

        {/* 🔹 프로필 이미지 컨테이너 */}
        <div className="profile-image-container">
          <label htmlFor="profile-upload">
            <img
              src={profileImage || "/default_profile.png"}
              alt="프로필"
              className="profile-image"
            />
            <span className="profile-upload-icon">📷</span>
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* 🔹 사용자 정보 입력 */}
        <form onSubmit={handleStart}>
          <div className="input-group">
            <label>사용자 이름</label>
            <input
              type="text"
              placeholder="2~10자 이내여야 합니다."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>계정 ID</label>
            <input
              type="text"
              placeholder="영문, 숫자, 특수문자(_.)만 사용 가능합니다."
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="bio">소개</label>
            <textarea
              id="bio"
              placeholder="자신에 대해 소개해 주세요!"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          {/* 🔹 "시작하기" 버튼 - 비활성화/활성화 기능 포함 */}
          <button
            type="submit"
            className={`profile-button ${username && accountId ? "active" : ""}`}
            disabled={!username || !accountId}
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
=======
  return <div>프로필 페이지</div>;
>>>>>>> 5e72bda28cbd59bfd922d28e310b1a9001b5f9ec
};

export default Profile;
