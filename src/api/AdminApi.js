import { jsonAPI } from "./DefaultApi";

export const footBallInit = () =>
  jsonAPI
    .post("/admin/football/init")
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, message: res.data.result };
      }
    })
    .catch((err) => {
      return {
        isSuccess: err.response?.data.isSuccess,
        message:
          err.response?.data?.message || "API 호출 중 오류가 발생했습니다.",
      };
    });

export const footBallUpdate = () =>
  jsonAPI
    .patch("/admin/football/update")
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, message: res.data.result };
      }
    })
    .catch((err) => {
      return {
        isSuccess: err.response?.data.isSuccess,
        message:
          err.response?.data?.message || "API 호출 중 오류가 발생했습니다.",
      };
    });

export const footBallTeamInit = () =>
  jsonAPI
    .patch("/admin/football/team/init")
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, message: res.data.result };
      }
    })
    .catch((err) => {
      return {
        isSuccess: err.response?.data?.isSuccess,
        message:
          err.response?.data?.message || "API 호출 중 오류가 발생했습니다.",
      };
    });

export const viewFootballLeague = () =>
  jsonAPI
    .get("/admin/football/league")
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, message: res.data.result };
      }
    })
    .catch((err) => {
      return {
        isSuccess: err.response?.data?.isSuccess,
        message:
          err.response?.data?.result || "API 호출 중 오류가 발생했습니다.",
      };
    });

export const viewFootballTeam = (teamId) =>
  jsonAPI
    .get(`/admin/football/team/${teamId}`)
    .then((res) => {
      if (res.status === 200) {
        return { isSuccess: res.data.isSuccess, message: res.data.result };
      }
    })
    .catch((err) => {
      return {
        isSuccess: err.response?.data?.isSuccess,
        message:
          err.response?.data?.message || "API 호출 중 오류가 발생했습니다.",
      };
    });
