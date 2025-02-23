import { newsMockData } from "../mock/NewsMockData";

export const getHistory = (token) => newsMockData;
// jsonApi
//   .get("/openai/history", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   .then((res) => {
//     if (res.status === 200) {
//       return res.data;
//     }
//   })
//   .catch((err) => {
//     throw new Error(err.message || "History News를 가져오는데 실패했습니다.");
//   });
