import React from 'react';
import './App.css';
import {Router, Switch} from "react-router-dom";
import {Button} from "@material-ui/core";
import Navbar from "./components/Navbar";
import ConnectionLost from "./components/ConnectionLost";
import {useConnectionStore} from "./stores/ConnectionStore";
import {useTokenStore} from "./stores/TokenStore";
import Login from "./components/Login";
import Main from "./Main";

function App() {

    const {token, isLogin} =  useTokenStore();

    return (
        <div>
            {isLogin(token) ? <Main /> : <Login />}
            <ConnectionLost />
        </div>
    )
}

export default App;
