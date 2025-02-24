import { jsonAPI } from "./DefaultApi";

export const getLeagueBoard = (token) =>
  jsonAPI
    .get("/home", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      throw new Error(err.message || "리그 정보를 가져오는데 실패했습니다.");
    });
