import React from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Main() {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
}
