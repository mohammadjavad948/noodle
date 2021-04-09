import React from 'react';
import './App.css';
import ConnectionLost from "./components/ConnectionLost";
import {useTokenStore} from "./stores/TokenStore";
import Login from "./components/Login";
import Main from "./Main";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {useThemeStore} from "./stores/ThemeStore";

function App() {

    const {token} =  useTokenStore();
    const {theme: themeSaved} = useThemeStore();

    const dark = createMuiTheme({
        palette: {
            type: 'dark',
            background: {
                default: '#0f0e17'
            },
            secondary: {
                main: '#ff8906',
                contrastText: '#fffffe'
            },
            primary: {
                main: '#e53170',
                contrastText: '#fffffe'
            },
        },
    });


    const light = createMuiTheme({
        palette: {
            type: 'light',
            background: {
                default: '#fffffe'
            },
            secondary: {
                main: '#ffd803',
                contrastText: '#2d334a'
            },
            primary: {
                main: '#bae8e8',
                contrastText: '#2d334a'
            }
        }
    });

    return (
        <div>
            <ThemeProvider theme={themeSaved === 'light' ? light : dark}>
                <CssBaseline />
                {token !== '' ? <Main /> : <Login />}
                <ConnectionLost />
            </ThemeProvider>
        </div>
    )
}

export default App;
