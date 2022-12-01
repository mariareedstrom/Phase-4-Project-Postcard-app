import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";


function NewCommentForm({comments, setComments, user, postcard}) {
    const [formData, setFormData] = useState({
        content: "",
        user_id: user.id,
        postcard_id: postcard.id
    })
    const [errors, setErrors] = useState([])


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        return fetch(`/api/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            setComments([...comments, data])
                            setFormData({...formData, content: ""})
                            setErrors([])
                        })
                } else {
                    res.json().then((errorsData) => {
                        setErrors((errorsData))
                    })
                }
            })
    }


    return (

        <Grid onSubmit={handleSubmit}>
            <TextField onChange={(e) => handleChange(e)}
                       label="new comment"
                       name="content"
                       value={formData.content}
                       placeholder="add comment"
                       fullWidth required/>
            {errors.length > 0 && (
                <ul style={{color: "red"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}

            <Button type="submit"
                    onClick={handleSubmit}
                    color="primary"

                    fullWidth required
                    variant="outlined">
                Submit
            </Button>
        </Grid>
    );
}

export default NewCommentForm;