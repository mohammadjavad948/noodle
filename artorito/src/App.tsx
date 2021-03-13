import React from 'react';
import './App.css';
import {Router, Switch} from "react-router-dom";
import {Button} from "@material-ui/core";
import Navbar from "./components/Navbar";
import ConnectionLost from "./components/ConnectionLost";
import {useConnectionStore} from "./stores/ConnectionStore";

function App() {

    const {disconnected,connected, status} = useConnectionStore();

    function click(){
        console.log(status)
        if (status){
            console.log('disconnect')
            disconnected()
        }else {
            console.log('connect')
            connected()
        }
    }
    return (
        <div>
            <Navbar />
            <Button onClick={click}>click</Button>
            <ConnectionLost />
        </div>
    );
}

export default App;
