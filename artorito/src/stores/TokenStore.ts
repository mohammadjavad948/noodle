import create, {State} from "zustand";

interface TokenStore extends State {
    token: string
    set: (token: string) => void
}

export const useTokenStore = create<TokenStore>(set => ({
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
