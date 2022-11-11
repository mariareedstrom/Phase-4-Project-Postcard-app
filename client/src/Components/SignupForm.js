import React, { useState } from 'react';
import {Avatar, Button, Grid, Paper, TextField, Typography, Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";




function SignupForm({setCurrentUser}) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        picture: ""
    })


    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        console.log(user)
                        setCurrentUser(user)
                    })
                } else {
                        resp.json().then((errors) => {
                            console.log(errors)
                        })
                    }
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
                    <h2>Welcome New User</h2>
                </Grid>
                <TextField onChange={(e) => handleChange(e)}
                           label="Name"
                           name="name"
                           value={formData.name}
                           placeholder="enter name"
                           fullWidth required/>
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
                <TextField onChange={(e) => handleChange(e)}
                           label="picture"
                           name="picture"
                           value={formData.picture}
                           placeholder="picture url"
                           type="url"
                           fullWidth required/>
                <Button type="submit"
                        color="primary"
                        style={buttonStyle}
                        fullWidth required
                        variant="contained">
                    Sign Up!
                </Button>
                <Typography> Already have an account?
                    <Link component={RouterLink}
                          to="/"
                    >Log In
                    </Link>
                </Typography>
            </Paper>
        </Grid>


    );


}

export default SignupForm;