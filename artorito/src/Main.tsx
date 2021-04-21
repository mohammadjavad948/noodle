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
import Label from "./Label";

export default function Main() {

    const {token} = useTokenStore();
    const {setLabels, newLabel, setLabel, removeLabel} = useLabelsStore();

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

        socket.on('new-label', (data: any) => {
            newLabel(data);
        });

        socket.on('update-label', (data: any) => {
            setLabel(data._id, data);
        });

        socket.on('remove-label', (data: any) => {
            removeLabel(data);
        });

        socket.onAny(console.log);

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
                    <Route path="/label/:id">
                        <Label />
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
