import create, {State} from "zustand";

interface ThemeStore extends State {
    theme: string
    dark: () => void
    light: () => void
}

export const useThemeStore = create<ThemeStore>(set => ({
    theme: localStorage.getItem('theme') || 'light',
    dark: () => {

        localStorage.setItem('theme', 'dark');

        set(() => {
            return {
                theme: 'dark'
            }
        })
    },
    light: () => {

        localStorage.setItem('theme', 'light');

        set(() => {
            return {
                theme: 'light'
            }
        })
    }
}))
