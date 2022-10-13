import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";


function Header({currentUser, setCurrentUser}) {

    function handleLogout(){
        setCurrentUser(null)
        fetch('/api/logout', {
            method: "DELETE"
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                        <img src='/postcard-logo.png' alt="logo"/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Greetings Friends
                    </Typography>

                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        <Avatar alt={`${currentUser.name}`} src="/avatar.png" />

                </Toolbar>
            </AppBar>
        </Box>

    );
}

export default Header;