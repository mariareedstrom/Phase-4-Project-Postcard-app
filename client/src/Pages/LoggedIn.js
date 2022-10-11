import React, { useEffect, useState } from 'react';
import PostcardIndex from "./PostcardIndex";
import Navbar from "../Components/Navbar";


function LoggedIn({currentUser, setCurrentUser}) {

    function handleLogout(){
        setCurrentUser(null)
        fetch('/api/logout', {
            method: "DELETE"
        })
    }

    return (
        <div>
            <Navbar/>
            <h3>Welcome {currentUser.name}!</h3>
            <PostcardIndex currentUser={currentUser}/>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
        </div>
    );
}

export default LoggedIn;