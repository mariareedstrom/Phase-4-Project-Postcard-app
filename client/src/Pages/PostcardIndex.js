import React from "react";
import Grid from "@mui/material/Grid";
import PostCard from "../Components/PostCard";
import {Box} from "@mui/material";


function PostcardIndex({currentUser, postcards}) {


    return (

        <Box display="flex" >
            <Grid container spacing={4}>
                {postcards.map((postcard) => (
                    <Grid item display="flex" key={postcard.id}>
                        <PostCard postcard={postcard} currentUser={currentUser}/>
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}

export default PostcardIndex;