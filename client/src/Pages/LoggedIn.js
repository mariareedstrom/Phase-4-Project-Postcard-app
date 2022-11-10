import React from 'react';
import PostcardIndex from "./PostcardIndex";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import {Link} from "react-router-dom";



function LoggedIn({currentUser}) {


    return (
        <div>
            <Link to="/postcards/new">
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" color="primary" aria-label="add postcard">
                    <SendIcon sx={{ mr: 1 }} />
                    Send Postcard
                </Fab>
            </Box>
            </Link>

            <PostcardIndex currentUser={currentUser}/>
        </div>
    );
}

export default LoggedIn;