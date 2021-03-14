import create, {State} from "zustand";

interface ConnectionStore extends State {
    token: string
    set: (token: string) => void
}

export const useConnectionStore = create<ConnectionStore>(set => ({
    token: localStorage.getItem('token') || "",
    set: (token) => {

        localStorage.setItem('token', token);

        set(() => {
            return {
                token: token
            }
        })
    }
}))
