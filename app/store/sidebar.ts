import { create } from "zustand"

interface SideBarState {
    displaySideBarState: boolean,
    openSideBar: () => void
    closeSideBar: () => void
}

export const useSideBarStore = create<SideBarState>((set) => ({
    displaySideBarState: false,
    openSideBar: () => set(() => ({ displaySideBarState: true })),
    closeSideBar: () => set(() => ({ displaySideBarState: false }))
}))