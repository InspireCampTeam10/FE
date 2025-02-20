import { create } from "zustand";

const searchTagStore = create((set, get) => ({
  tags: [],
  categoryTags: [],
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
  addCtag: (ctag) => {
    const { categoryTags, setCategoryTags } = get();
    if (!categoryTags.includes(ctag)) {
      setCategoryTags([...categoryTags, ctag]);
    } else {
      setCategoryTags([...categoryTags]);
    }
  },
  removeCtag: (ctag) => {
    const { categoryTags, setCategoryTags } = get();
    setCategoryTags(categoryTags.filter((item) => item !== ctag));
  },
}));

export default searchTagStore;
