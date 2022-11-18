import React, {useState, useEffect} from 'react';
import {Grid, MenuItem, Paper, TextField, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {Link, useNavigate} from "react-router-dom";
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
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

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

    function handleSelectDestination() {
        setIsNewDestination(false)
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleDestinationChange(e) {
        setFormData({...formData, destination_id: e.target.value})
    }

    function handleNewDestinationChange(e) {
        setFormData({...formData, destination_attributes: {name: e.target.value}})
    }

    function handleSubmit(e) {
        e.preventDefault()
        // XXX: Allows for using existing or new destination
        const cleaned = {...formData}
        if(cleaned.destination_id) {
            delete cleaned.destination_attributes;
        } else {
            delete cleaned.destination_id;
        }

        fetch(`/api/postcards/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cleaned)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(() => navigate("/"))
                } else
                    res.json().then((errorsData) => {
                        setErrors(errorsData)
                    })
            })

    }




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
                       display: 'flex',
                       flex: 1,
                       flexDirection: 'column',
                       gap: '12px',
                       maxWidth: '650px',
                       padding: '20px'

                   }}
            >
                <Box>
                    <SendIcon/>
                    <Typography variant={"h6"}>Send a new Postcard</Typography>
                </Box>
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
                                   value={formData.destination_attributes?.name}
                                   placeholder="enter destination"
                                   fullWidth required/>
                }

                { !isNewDestination ? <Button onClick={handleNewDestination} variant="outlined">Add a new destination </Button> : null}
                { isNewDestination ? <Button onClick={handleSelectDestination} variant="outlined">Select destination </Button> : null}
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
                {errors.length > 0 && (
                    <ul style={{ color: "red" }}>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <Fab variant="extended" size="medium" color="primary" aria-label="submit" type="submit">
                        Submit
                    </Fab>
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" component={Link} to="/">
                        Cancel
                    </Fab>
                </Box>
            </Paper>
        </Box>
    );
}

export default NewPostcardForm;