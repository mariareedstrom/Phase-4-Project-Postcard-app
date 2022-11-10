import React, {useState, useEffect} from 'react';
import {Grid, MenuItem, Paper, TextField, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from "@mui/material/Typography";

function NewPostcardForm({user}) {
    const [formData, setFormData] = useState({
        destination_id: null,
        destination_attributes: null,
        greeting: "",
        image_url: "",
        user_id: user.id
    })

    //to toggle dropdown vs destination input field
    const [isNewDestination, setIsNewDestination] = useState(false)

    //currently available destinations for dropdown
    const [availableDestinations, setAvailableDestinations] = useState([])





    useEffect(() => {
        fetch(`/api/destinations`)
            .then(res => res.json())
            .then(data => setAvailableDestinations(data)
            )
    }, [])

    //display add new dest button
    function handleNewDestination() {
        setIsNewDestination(true)
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleDestinationChange(e) {
        setFormData({...formData, destination_id: e.target.value, destination_attributes: {}})
    }

    function handleNewDestinationChange(e) {
        setFormData({...formData, destination_id: null, destination_attributes: {name: e.target.value}})
    }

    function handleSubmit(e) {
        e.preventDefault()

        console.log(formData)

        fetch(`/api/postcards/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => console.log(data))
                } else
                    res.json().then((errors) => {
                        console.log(errors)
                    })
            })

    }



    return (
        <Grid>
            <Paper elevation={10}
                   component="form"
                   onSubmit={handleSubmit}
            >
                <Grid align="center">
                    <SendIcon/>
                    <Typography>Send a new Postcard</Typography>
                </Grid>
                {
                    !isNewDestination ?
                        <TextField
                            id="outlined-select-destination"
                            select
                            label="Select Destination"
                            onChange={handleDestinationChange}
                            value={formData.destination_id}
                            fullWidth required
                        >
                            {availableDestinations.map((dest) => (
                                <MenuItem key={dest.id} value={dest.id}>
                                    {dest.name}
                                </MenuItem>
                            ))}
                        </TextField> :
                        <TextField onChange={handleNewDestinationChange}
                                   label="destination"
                                   name="destination"
                                   value={formData.destination_attributes.name}
                                   placeholder="enter destination"
                                   fullWidth required/>
                }

                { !isNewDestination ? <Button onClick={handleNewDestination} variant="outlined">Add a new destination </Button> : null}

                <TextField onChange={(e) => handleChange(e)}
                           label="image"
                           name="image_url"
                           value={formData.image_url}
                           placeholder="enter image url"
                           type="text"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="greeting"
                           name="greeting"
                           value={formData.greeting}
                           placeholder="enter greeting"
                           type="text"
                           fullWidth required/>
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <Fab variant="extended" size="medium" color="primary" aria-label="submit" type="submit">
                        Submit
                    </Fab>
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" component={Link} to="/">
                        Cancel
                    </Fab>
                </Box>

            </Paper>
        </Grid>
    );
}

export default NewPostcardForm;