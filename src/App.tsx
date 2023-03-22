import React from "react";
import {BrowserRouter as Router, Outlet, Route} from "react-router-dom";
import Navbar from "./components/Obj/NavBar";

function App() {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
        </div>

    );
}

export default App;
