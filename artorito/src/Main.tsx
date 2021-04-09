import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Dashboard";

export default function Main() {

    useEffect(() => {

    }, []);

    return (
        <BrowserRouter>
            <Navbar />

            <div className="container mt-2">
                <Switch>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}
