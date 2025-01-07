import { create } from "zustand";

export const userDataStore = create((set) => ({
  data: null,
  updateData: (newData) => set({ data: newData }),
  removeData: () => set({ data: null }),
}));
