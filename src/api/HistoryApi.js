// import { newsMockData } from "../mock/NewsMockData";

import { jsonAPI } from "./DefaultApi";

export const getHistory = () =>
  jsonAPI
    .get("/openai/history")
    .then((res) => {
      if (res.status === 200) {
        return res.data.result;
      }
    })
    .catch((err) => {
      throw new Error(
        err.message || "[API] 히스토리를 가져오는데 실패했습니다."
      );
    });

export const deleteHistory = () => {};
