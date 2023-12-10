import { create } from 'zustand';

const useButtonStore = create((set) => ({
  isRecording: false,
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
  toggleStop: () => set({isRecording: false }),
}));

export default useButtonStore;
