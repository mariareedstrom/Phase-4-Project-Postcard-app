import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";
import {Link} from 'react-router-dom'


function Header({currentUser, setCurrentUser, handleLogout}) {



    return (

            <AppBar position="static">
                <Toolbar>
                    <Link to={`/`}>
                        <Avatar alt={`logo`} src='/postcard-logo.png' />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Greetings Friends
                    </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    <Link to={`/users/${currentUser.id}`}>
                        <Avatar alt={`${currentUser.name}`} src="/avatar.png" />
                    </Link>
                </Toolbar>
            </AppBar>


    );
}

export default Header;