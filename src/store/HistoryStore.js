import { create } from "zustand";

export const historyStore = create((set, get) => ({
  histories: [],
  setHistoryArr: (newsArr) => set({ histories: [...newsArr] }),
  addHistory: (news) => {
    const { histories, setHistoryArr } = get();
    setHistoryArr([...histories, news]);
  },
  removeHistory: (id) => {
    const { histories, setHistoryArr } = get();
    setHistoryArr(histories.filter((news) => news.id !== id));
  },
}));
