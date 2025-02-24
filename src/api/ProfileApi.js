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
