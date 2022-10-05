import React from 'react';

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
        </div>
    );
}

export default LoggedIn;