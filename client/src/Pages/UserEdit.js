import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, Button, Paper, TextField} from "@mui/material";


function UserEdit() {
    const userId = useParams().id
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        username: "",
        picture: "",
        id: null
    })

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then((data) => setUser(data))
    }, [userId])


    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }


    function handleSubmit(e) {
        e.preventDefault()

        return fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                navigate(`/users/${userId}`)
            })
    }

    function handleFromCancel() {
        navigate(`/users/${userId}`)
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
                       gap: '12px',
                       padding: '20px',
                       maxWidth: '320px'
                   }}>

                <Typography variant={"h6"}>Update your info!</Typography>

                <TextField onChange={(e) => handleChange(e)}
                           label="Name"
                           name="name"
                           value={user.name}
                           placeholder="enter name"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="Username"
                           name="username"
                           value={user.username}
                           placeholder="enter username"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="picture"
                           name="picture"
                           value={user.picture}
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