import { create } from "zustand";
import { deleteHistory } from "../api/HistoryApi";

export const historyStore = create((set, get) => ({
  histories: [],
  setHistoryArr: (newsArr) => set({ histories: [...newsArr] }),
  addHistory: (news) => {
    const { histories, setHistoryArr } = get();
    setHistoryArr([...histories, news]);
  },
  removeHistory: (id) => {
    const { histories, setHistoryArr } = get();
    const callDeleteHistoryApi = async () => {
      const response = await deleteHistory(id);
      if (!response) {
        throw new Error("History 삭제에 실패했습니다.");
      }
    };
    callDeleteHistoryApi();
    setHistoryArr(histories.filter((news) => news.id !== id));
  },
}));
