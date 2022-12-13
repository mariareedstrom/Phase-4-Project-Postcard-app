import React, { useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from "@mui/material/Typography";
import {Button, Paper, TextField} from "@mui/material";

function PostcardEdit() {
    const [errors, setErrors] = useState(null)

    const location = useLocation();
    const { postcard } = location.state;

    const [formData, setFormData] = useState({
        greeting: postcard.greeting,
        image_url: postcard.image_url
    })

    const navigate = useNavigate()


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/api/postcards/${postcard.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(() => navigate(`/postcards/${postcard.id}`))
                } else {
                    res.json().then((errorsData) => setErrors(errorsData))
                }
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
                       gap: '24px',
                       maxWidth: '650px',
                       padding: '20px'
                   }}
            >
                <Box>
                    <EditOutlinedIcon/>
                    <Typography variant={"h6"}>Edit Postcard</Typography>
                </Box>

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

                {!!errors && errors.length > 0 && (
                    <ul style={{ color: "red" }}>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                )}

                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <Button variant="contained" size="medium" color="primary" aria-label="submit" type="submit">
                        Submit
                    </Button>
                    <Button variant="outlined" size="medium" color="error" aria-label="add" component={Link} to="/">
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default PostcardEdit;