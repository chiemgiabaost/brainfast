import { create } from 'zustand'

export interface SidebarState {
    isOpen: boolean;
    handleOpenOrClose: () => void;
    handleClose: () => void;
}
export const useSidebarStore = create<SidebarState>()((set) => ({
    isOpen: false,
    handleOpenOrClose: () => set((state => ({...state, isOpen: !state.isOpen}))),
    handleClose: () => set((state) => ({...state, isOpen: false})), // Add the missing handleClose property
}))