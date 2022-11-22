import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {AppBar, Toolbar, Button, Avatar, Container} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


function Header({currentUser, handleLogout}) {

    const navigate = useNavigate()

    function handleSendPostcard() {
        navigate(`/postcards/new`)
    }

    function handleViewUser() {
        navigate(`/users/${currentUser.id}`)
    }

    return (

        <AppBar position="static" sx={{marginBottom: "36px", bgcolor: "#fff"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={`/`} style={{flex: 1}}>
                        <div style={{height: '60px', overflow: 'hidden'}}>
                            <img alt="logo" src="/postcard-logo.png"
                                 style={{objectPosition: '0 -30px', height: '120px'}}/>
                        </div>
                    </Link>

                    <Button variant="outlined" color="primary" aria-label="add postcard" sx={{margin: "12px"}}
                            onClick={handleSendPostcard}>
                        <SendIcon sx={{mr: 1}}/>
                        Send Postcard
                    </Button>

                    <Button variant="outlined" color="primary" sx={{margin: "12px"}}
                            onClick={handleLogout}>Logout</Button>

                    <Avatar alt={`${currentUser.name}`} src={currentUser.picture} sx={{margin: "12px"}}
                            onClick={handleViewUser}/>


                </Toolbar>
            </Container>
        </AppBar>


    );
}

export default Header;