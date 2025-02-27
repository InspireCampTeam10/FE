import { create } from "zustand";

export const useSearchTagStore = create((set, get) => ({
  tags: [],
  categoryTags: "",
  setTags: (tags) => set(() => ({ tags })),
  setCategoryTags: (categoryTags) => set(() => ({ categoryTags })),
  addTag: (tag) => {
    const { tags, setTags } = get();
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      setTags([...tags]);
    }
  },
  removeTag: (tag) => {
    const { tags, setTags } = get();
    setTags(tags.filter((item) => item !== tag));
  },
  resetTags: () => {
    set({
      tags: [],
      categoryTags: "",
    });
  },
}));
