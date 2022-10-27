import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';






function LoginForm({ setCurrentUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        setCurrentUser(user)
                    })
                } else
                    res.json().then((errors) => {
                        console.error(errors)
                    })
            })

    }
    const paperStyle={padding :20, height:"70vp", width: 280, margin: "20px auto"}
    const buttonStyle={margin: "8px, 0"}

    return (

        <Grid>
            <Paper elevation={10}
                   style={paperStyle}
                   component="form"
                   onSubmit={handleSubmit}>
                <Grid align="center">
                <Avatar ><VpnKeyOutlinedIcon/>></Avatar>
                <h2>Sign In</h2>
                </Grid>
                <TextField onChange={(e) => handleChange(e)}
                           label="Username"
                           name="username"
                           value={formData.username}
                           placeholder="enter username"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="Password"
                           name="password"
                           value={formData.password}
                           placeholder="enter password"
                           type="password"
                           fullWidth required/>
                <Button type="submit"
                        color="primary"
                        style={buttonStyle}
                        fullWidth required
                        variant="contained">
                        Sign In
                </Button>
                <Typography> Don't have an account?
                    <Link component={RouterLink}
                          to="/signup"
                    >Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>


    );


}

export default LoginForm;