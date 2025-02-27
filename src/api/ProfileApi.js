import { jsonAPI } from "./DefaultApi";

export const updateUserInfo = ({ username, updateNickName }) =>
  jsonAPI
    .put("/user/update", {
      username,
      userNickname: updateNickName,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch((err) => {
      throw new Error(
        err.message || "유저 프로필 업데이트 과정에서 오류가 발생했습니다."
      );
    });

export const updateProfileImage = (username, file) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("file", file);

  return jsonAPI
    .put("/user/profileIMG", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data.result;
      }
    })
    .catch((err) => {
      throw new Error(
        err.message || "프로필 이미지 업데이트 과정에서 오류가 발생했습니다."
      );
    });
};
