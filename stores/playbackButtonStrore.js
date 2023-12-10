import { create } from "zustand";

const usePlaybackBtnStore = create((set) => ({
  isRecording: false,
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
  toggleStop: () => set({ isRecording: false }),
}));

export default usePlaybackBtnStore;
