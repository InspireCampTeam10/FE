import { jsonApi } from "./LeagueBoardApi";

/**
 * @typedef {Object} SearchRequest
 * @property {string[]} keyword
 */

/**
 * @typedef {Object} SearchResponse
 * @property {string} title - 기사 제목
 * @property {string} summary - 기사 요약
 * @property {string} new_link - 기사 링크
 */

/**
 * @param {string} token - 인증 토큰
 * @param {SearchRequest} data - Request 데이터 타입
 * @returns {Promise<SearchResponse>} 검색 결과
 * @throws {Error} API 요청 실패 시 에러
 */
export const postSearchApi = (token, data) => {
  return {
    id: 1231424,
    title: "제목",
    content: "컨텐츠",
    timestamp: "시간",
  };
};

// jsonApi
//   .post("/search", data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   .then((res) => {
//     if (res.status === 200) return res.data;
//   })
//   .catch((err) => {
//     throw new Error(err.message || "검색 답변을 가져오는데 실패했습니다.");
//   });
