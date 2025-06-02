// stores/usePopupStore.ts
"use client";

import { create } from "zustand";

interface PopupState {
  isOpen: boolean;
  headline: string;
  description?: string;
  payload?: any; // optional payload
  openPopup: (headline: string, description?: string, payload?: any) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  headline: "",
  description: "",
  payload: null,
  openPopup: (headline, description = "", payload = null) =>
    set({ isOpen: true, headline, description, payload }),
  closePopup: () => set({ isOpen: false, headline: "", description: "", payload: null }),
}));
