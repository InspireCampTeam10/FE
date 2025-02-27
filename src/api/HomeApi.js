import { jsonAPI } from "./DefaultApi";

export const getLeagueBoard = () =>
  jsonAPI
    .get("/football/home")
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, result: res.data.result };
      }
    })
    .catch((err) => {
      if (err.response?.data) {
        return {
          isSuccess: err.response.data.isSuccess,
          result: err.response.data.result,
        };
      }
      throw new Error(err.message || "리그 정보를 가져오는데 실패했습니다.");
    });
