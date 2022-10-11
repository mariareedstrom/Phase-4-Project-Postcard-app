import React from 'react';
import { Route, Link } from "react-router-dom";
// import { AppBar, Toolbar, Box } from "@mui/material"

function Header() {
    return (
        <div>
            <img src="/postcard-logo.png" alt="logo" />
            <h4 className="title">Greetings friends </h4>
        </div>

    );
}

export default Header;