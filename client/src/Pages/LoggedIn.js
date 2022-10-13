import React from 'react';
import PostcardIndex from "./PostcardIndex";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";


function LoggedIn({currentUser, setCurrentUser}) {



    return (
        <div>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <h3>Welcome {currentUser.name}!</h3>
            <PostcardIndex currentUser={currentUser}/>
        </div>
    );
}

export default LoggedIn;