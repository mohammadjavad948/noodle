import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Dashboard";
import {allLabels} from "./api/api";
import {useTokenStore} from "./stores/TokenStore";
import {useLabelsStore} from "./stores/LabelsStore";
import NewTime from "./NewTime";
import TimeManager from "./components/TimeManager";
import {io} from 'socket.io-client';
import {ENDPOINT} from "./env";

export default function Main() {

    const {token} = useTokenStore();
    const {setLabels} = useLabelsStore();

    useEffect(() => {
        allLabels(token)
            .then((res: any) => {
                setLabels(res.data.labels);
            })
            .catch(console.log);

        const socket = io(ENDPOINT, {
            auth: {
                token
            }
        });

        socket.on('connect', () => {
            console.log('%c [WS]%c authenticated', 'color: purple', 'color: black')
        });

        socket.on('disconnect', () => {
            console.log('%c [WS]%c disconnected', 'color: purple', 'color: red')
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <Navbar />

            <div className="container mt-2">
                <Switch>
                    <Route path="/new">
                        <NewTime />
                    </Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>

            <TimeManager />
        </BrowserRouter>
    )
}
