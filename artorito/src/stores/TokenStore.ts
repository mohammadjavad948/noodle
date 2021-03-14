import create, {State} from "zustand";

interface TokenStore extends State {
    token: string
    set: (token: string) => void
    isLogin: (token: string) => boolean
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
    },
    isLogin: (token) => {
        return token !== ''
    }
}))
