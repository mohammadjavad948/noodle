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

    const theme = createMuiTheme({
        palette: {
            // @ts-ignore
            type: themeSaved
        }
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {token !== '' ? <Main /> : <Login />}
                <ConnectionLost />
            </ThemeProvider>
        </div>
    )
}

export default App;
