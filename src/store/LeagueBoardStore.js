import { create } from "zustand";
import { getLeagueBoard } from "../api/HomeApi";

export const useLeagueBoardStore = create((set) => ({
  leagueBoardData: "",
  setLeagueBoardData: async () => {
    const { isSuccess, result } = await getLeagueBoard();
    if (isSuccess) {
      set({
        leagueBoardData: result,
      });
    }
  },
}));
