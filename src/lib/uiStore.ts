import { create } from 'zustand';

type UIState = {
  isChatOpen: boolean;
  isPaletteOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isChatOpen: false,
  isPaletteOpen: false,
  openChat: () => set({ isChatOpen: true, isPaletteOpen: false }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),
  openPalette: () => set({ isPaletteOpen: true }),
  closePalette: () => set({ isPaletteOpen: false }),
  togglePalette: () => set((s) => ({ isPaletteOpen: !s.isPaletteOpen })),
}));
