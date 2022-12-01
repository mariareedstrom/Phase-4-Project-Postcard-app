import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, Button, Paper, TextField} from "@mui/material";


function UserEdit({currentUser, setCurrentUser}) {
    const navigate = useNavigate()

    function handleChange(e) {
        setCurrentUser({...currentUser, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        return fetch(`/api/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
                navigate(`/users/${currentUser.id}`)
            })
    }

    function handleFromCancel() {
        navigate(`/users/${currentUser.id}`)
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '40px'
        }}>

            <Paper elevation={10}
                   component="form"
                   onSubmit={handleSubmit}
                   sx={{
                       display: 'flex',
                       flex: 1,
                       flexDirection: 'column',
                       gap: '24px',
                       padding: '20px',
                       maxWidth: '320px'
                   }}>

                <Typography variant={"h6"}>Update your info!</Typography>

                <TextField onChange={(e) => handleChange(e)}
                           label="Name"
                           name="name"
                           value={currentUser.name}
                           placeholder="enter name"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="Username"
                           name="username"
                           value={currentUser.username}
                           placeholder="enter username"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="picture"
                           name="picture"
                           value={currentUser.picture}
                           placeholder="picture url"
                           type="url"
                           fullWidth required/>

                <Button type="submit"
                        onClick={handleSubmit}
                        sx={{margin: "8px, 0"}}
                        variant="contained"
                        fullWidth required>
                    Submit
                </Button>
                <Button
                    onClick={handleFromCancel}
                    sx={{margin: "8px, 0"}}
                    variant="outlined"
                    fullWidth required>
                    Cancel
                </Button>
            </Paper>
        </Box>
    );
}

export default UserEdit;