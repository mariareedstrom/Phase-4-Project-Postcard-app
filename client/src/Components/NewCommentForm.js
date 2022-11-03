import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";


function NewCommentForm({comments, setComments, user, postcard}) {
    const [formData, setFormData] = useState({
        content: "",
        user_id: user.id,
        postcard_id: postcard.id
    })




    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()

        return fetch(`/api/comments/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                setComments([...comments, data])
                setFormData({...formData, content:""})
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