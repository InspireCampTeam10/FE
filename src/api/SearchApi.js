import { jsonAPI } from "./DefaultApi";

export const postSearchApi = (keywords) =>
  jsonAPI
    .post("openai/search", { keywords })
    .then((res) => {
      if (res.status === 200) {
        return res.data.result[0].news[0];
      }
    })
    .catch((err) => {
      throw new Error(err.message || "검색에 실패했습니다.");
    });
