import create, {State} from "zustand";

interface ConnectionStore extends State {
    status: boolean
    connected: () => void
    disconnected: () => void
}

export const useConnectionStore = create<ConnectionStore>(set => ({
    status: false,
    connected: () => {
        set(() => {
            return {
                status: true
            }
        })
    },
    disconnected: () => {
        set(() => {
            return {
                status: false
            }
        })
    }
}))
