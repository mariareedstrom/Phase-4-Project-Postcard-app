import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Grid, Paper, TextField} from "@mui/material";


function UserEdit({}) {
    const userId = useParams().id
    const navigate = useNavigate()

const [user, setUser] = useState({
    name: "",
    username: "",
    id: null
})

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then((data) => setUser(data))
    }, [userId])


    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }


    function handleSubmit(e){
        e.preventDefault()

        return fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                navigate(`/users/${userId}`)
            })
    }



    function handleFromCancel(){
        navigate(`/users/${userId}`)
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
                    <Typography component="h2" variant="h4" gutterBottom sx={{marginTop: '16px'}}>
                        Update your info!
                    </Typography>
                </Grid>
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

                <Button type="submit"
                        onClick={handleSubmit}
                        color="primary"
                        style={buttonStyle}
                        fullWidth required
                        variant="contained">
                    Submit
                </Button>
                <Button type="cancel"
                        onClick={handleFromCancel}
                        color="primary"
                        style={buttonStyle}
                        fullWidth required
                        variant="contained">
                    Cancel
                </Button>
            </Paper>

        </Grid>
    );
}

export default UserEdit;