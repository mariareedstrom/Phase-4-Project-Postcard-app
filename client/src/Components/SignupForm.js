import React, {useState} from 'react';
import {Button, Paper, TextField, Typography, Link, Box} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom'


function SignupForm({setCurrentUser}) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        picture: ""
    })

    const navigate = useNavigate()


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        setCurrentUser(user)
                        navigate('/')
                    })
                } else {
                    resp.json().then((errors) => {
                        console.log(errors)
                    })
                }
            })
    }


    const buttonStyle = {margin: "8px, 0"}

    return (

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:'40px'
        }}>
            <Paper elevation={10}
                   component="form"
                   onSubmit={handleSubmit}
                   sx={{
                       display: "flex",
                       flex:1,
                       flexDirection: "column",
                       gap: "12px",
                       padding: '20px',
                       maxWidth: '320px',
                   }}>
                <Box>
                    <Box sx={{height: '60px', overflow: 'hidden'}}>
                        <img alt="logo" src="/postcard-logo.png"
                             style={{objectPosition: '0 -30px', height: '120px'}}/>
                    </Box>
                    <Typography variant={"h6"}>Welcome New User</Typography>
                </Box>

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
                <Typography>Already have an account? </Typography>
                <Link component={RouterLink} to="/" sx={{marginLeft: '1em'}}>Log In</Link>

            </Paper>
        </Box>


    );


}

export default SignupForm;