import create, {State} from "zustand";

interface StartStore extends State {
    start: boolean
    set: (start: boolean) => void
}

export const useStartStore = create<StartStore>(set => ({
    start: false,
    set: (start: boolean) => {
        set({start});
    }
}))
