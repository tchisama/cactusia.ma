// make me a user store of zustand

import { create } from 'zustand'

export type UserState = {
  user: any
  setUser: (user: any) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
