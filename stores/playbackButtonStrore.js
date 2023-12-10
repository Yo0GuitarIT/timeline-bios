import { create } from "zustand";

const usePlaybackBtnStore = create((set) => ({
  isRecording: false,
  isPlaying: false,
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleStop: () => set({ isRecording: false, isPlaying: false }),
  togglePause: () => set({  isPlaying: false }),
}));

export default usePlaybackBtnStore;
