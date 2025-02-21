import { create } from "zustand";

export const homeStore = create((set) => ({
  messages: [],
  userMessages: [],
  isLoading: false,
  selectedTab: "",
  reset: () =>
    set(
      {
        messages: [],
        userMessages: [],
        isLoading: false,
        selectedTab: "",
      },
      true
    ),
}));
