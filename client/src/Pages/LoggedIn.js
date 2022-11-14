import React from 'react';
import PostcardIndex from "./PostcardIndex";




function LoggedIn({currentUser}) {


    return (
        <div>
            <PostcardIndex currentUser={currentUser}/>
        </div>
    );
}

export default LoggedIn;