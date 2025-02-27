import { authAPI } from "./DefaultApi";

export const login = (email, password) =>
  authAPI
    .post("/user/login", { username: email, password })
    .then((res) => {
      if (res.status === 200) {
        const { image, token } = res.data;
        sessionStorage.setItem("base64Img", `data:image/png;base64,${image}`);
        sessionStorage.setItem("access-token", token);
        return { image, token };
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        return null;
      }
      throw new Error(err.message || "로그인에 실패했습니다.");
    });

export const signUp = (email, password, userNickname) =>
  authAPI
    .post("/user/join", {
      username: email,
      password,
      userNickname,
    })
    .then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("access-token", res.data.result.token);
        sessionStorage.setItem("base64Img", "null");
        return { isSuccess: true, message: "회원 가입 성공" };
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
      }
      throw new Error("회원가입 오류");
    });
