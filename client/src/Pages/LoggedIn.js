import React from 'react';
import PostcardIndex from "./PostcardIndex";



function LoggedIn({currentUser, setCurrentUser}) {



    return (
        <div>
            <h3>Greetings {currentUser.name}!</h3>
            <PostcardIndex currentUser={currentUser}/>
        </div>
    );
}

export default LoggedIn;