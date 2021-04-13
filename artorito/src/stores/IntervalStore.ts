import create, {State} from "zustand";

interface IntervalStore extends State {
    interval: NodeJS.Timeout | null
    set: (interval: NodeJS.Timeout) => void
}

export const useIntervalStore = create<IntervalStore>(set => ({
    interval: null,
    set: (interval: NodeJS.Timeout) => {
        set({interval});
    }
}))
