import React from 'react';
import PostcardIndex from "./PostcardIndex";


function LoggedIn({currentUser}) {

    return (
        <>
            <PostcardIndex currentUser={currentUser}/>
        </>
    );
}

export default LoggedIn;