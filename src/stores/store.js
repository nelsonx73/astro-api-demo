import { create } from 'zustand'

export const useStore = create((set) => ({
    officialFlag: 0,
    official: null,
    updateOfficialFlag: () => set((state) => ({ officialFlag: state.officialFlag + 1, official: null })),
    updateOfficial: (value) => set((state) => ({ official: value })),
}))