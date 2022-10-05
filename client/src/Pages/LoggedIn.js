import React from 'react';
import PostcardShow from "./PostcardShow";

function LoggedIn({currentUser, setCurrentUser}) {

    function handleLogout(){
        setCurrentUser(null)
        fetch('/api/logout', {
            method: "DELETE"
        })
    }

    return (
        <div>
            <h3>Welcome {currentUser.name}!</h3>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
            <PostcardShow/>
        </div>
    );
}

export default LoggedIn;