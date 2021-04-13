import create, {State} from "zustand";

interface TimeStore extends State {
    time: number
    set: (time: number) => void
    update: () => void
}

export const useTimeStore = create<TimeStore>(set => ({
    time: 0,
    set: (time: number) => {
        set({time});
    },
    update: () => {
        set((state) => ({time: state.time + 100}))
    }
}))
