import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PostCard from "../Components/PostCard";
import {Box} from "@mui/material";




function PostcardIndex({currentUser}) {
    const [postcards, setPostcards] = useState([])


    useEffect(() => {
        fetch('/api/postcards')
            .then((res) => res.json())
            .then((postcards) => {
                setPostcards(postcards)
            })

    }, [])


    return (

        <Box sx={{display:'flex'}}>
            <Grid container spacing={4} >
                {postcards.map((postcard) => (
                    <Grid item display="flex" key={postcard.id}>
                        <PostCard postcard={postcard} currentUser={currentUser} />
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}

export default PostcardIndex;