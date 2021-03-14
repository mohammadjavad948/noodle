import React from 'react';
import './App.css';
import ConnectionLost from "./components/ConnectionLost";
import {useTokenStore} from "./stores/TokenStore";
import Login from "./components/Login";
import Main from "./Main";

function App() {

    const {token} =  useTokenStore();

    return (
        <div>
            {token !== '' ? <Main /> : <Login />}
            <ConnectionLost />
        </div>
    )
}

export default App;
