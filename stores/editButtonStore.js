import { create } from "zustand";

const useEditBtnStore = create((set) => ({
  cursor: true,
  select: false,
  shift: false,
  fadeIn: false,
  fadeOut: false,

  setCursor: () => set({ cursor: true, select: false, shift: false, fadeIn: false, fadeOut: false }),
  setSelect: () => set({ cursor: false, select: true, shift: false, fadeIn: false, fadeOut: false }),
  setShift: () => set({ cursor: false, select: false, shift: true, fadeIn: false, fadeOut: false }),
  setFadeIn: () => set({ cursor: false, select: false, shift: false, fadeIn: true, fadeOut: false }),
  setFadeOut: () => set({ cursor: false, select: false, shift: false, fadeIn: false, fadeOut: true }),
}))

export default useEditBtnStore;
