import { authAPI } from "./DefaultApi";

export const login = (email, password) =>
  authAPI
    .post("/user/login", { username: email, password })
    .then((res) => {
      if (res.status === 200) {
        console.log("login API 결과  :", res.data);
        sessionStorage.setItem("access-token", res.data.token);
      }
    })
    .catch((err) => {
      throw new Error(err.message || "검색 답변을 가져오는데 실패했습니다.");
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
        console.log("signUp 결과 ", res.data);
      }
    })
    .catch((err) => {
      throw new Error(err.message || "회원 가입에 실패했습니다.");
    });
