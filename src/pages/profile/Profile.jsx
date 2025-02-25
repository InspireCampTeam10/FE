import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useUserInfo } from "../../hooks/useUserInfo";
import { updateProfileImage, updateUserInfo } from "../../api/ProfileApi";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { username, nickName, imgUrl, handleLogout } = useUserInfo();
  const [updateNickName, setUpdateNickName] = useState(nickName);
  const isActive = nickName !== updateNickName;
  const [isUpdate, setIsUpdate] = useState({ isActive: false, message: "" });
  const navigate = useNavigate();

  console.log("imgUrl : ", imgUrl);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      updateProfileImage(username, file);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUserInfo({ username, updateNickName });
      if (response) {
        setIsUpdate({ isActive: true, message: "정상적으로 변경되었습니다." });
        return;
      }
      setIsUpdate({
        isActive: false,
        message: "변경에 실패했습니다. \n 다시 시도해주세요",
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    setProfileImage(imgUrl);
  }, [imgUrl]);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div onClick={handleLogout}>로그아웃</div>
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
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="profile-image-container"
            style={{ display: "none" }}
          />
        </div>

        {/* 🔹 사용자 정보 입력 */}
        <div className="profile-currnet-id">
          <label>계정 ID</label>
          <span>{username}</span>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <label>사용자 이름</label>
            <input
              type="text"
              placeholder="2~10자 이내여야 합니다."
              value={updateNickName}
              onChange={(e) => setUpdateNickName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`profile-button ${isActive ? "active" : ""}`}
          >
            수정하기
          </button>
        </form>
      </div>
      {isUpdate.isActive && (
        <>
          <div
            className="profile-msg-box-overlay"
            onClick={() =>
              setIsUpdate((prev) => {
                return { ...prev, isActive: false };
              })
            }
          ></div>
          <div className="profile-msg-box-container">
            <div className="profile-msg-title">작업 결과</div>
            <div className="profile-msg-content">{isUpdate.message}</div>
            <button className="profile-msg-close" onClick={() => {}}>
              확인
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
