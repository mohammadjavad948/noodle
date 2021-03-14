import React from 'react';
import './App.css';
import {Router, Switch} from "react-router-dom";
import {Button} from "@material-ui/core";
import Navbar from "./components/Navbar";
import ConnectionLost from "./components/ConnectionLost";
import {useConnectionStore} from "./stores/ConnectionStore";
import {useTokenStore} from "./stores/TokenStore";

function App() {

    const {token} =  useTokenStore();

    return (
        <div>
            <Navbar />

            <ConnectionLost />
        </div>
    );
}

export default App;
