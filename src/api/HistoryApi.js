// import { newsMockData } from "../mock/NewsMockData";

import { jsonAPI } from "./DefaultApi";

export const getHistory = () =>
  jsonAPI
    .get("/openai/history")
    .then((res) => {
      if (res.status === 200) {
        return res.data.result;
      }
      return false;
    })
    .catch((err) => {
      throw new Error(
        err.message || "[API] 히스토리를 가져오는데 실패했습니다."
      );
    });

export const deleteHistory = (historyId) =>
  jsonAPI
    .delete(`/openai/history/${historyId}`)
    .then((res) => res.status === 200)
    .catch((err) => {
      throw new Error(
        err.message || "[API] 히스토리를 삭제하는 과정에서 오류가 발생했습니다."
      );
    });
