import React from 'react';
import PostcardIndex from "./PostcardIndex";
import {Box} from "@mui/material";




function LoggedIn({currentUser}) {


    return (
        <>
            <PostcardIndex currentUser={currentUser}/>
        </>
    );
}

export default LoggedIn;