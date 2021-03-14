import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Main() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="container">
                <Switch>

                </Switch>
            </div>
        </BrowserRouter>
    )
}
