import React from 'react';
import Header from "../Components/Header";
import {Box, Typography} from "@mui/material";
import DestinationSelector from "../Components/DestinationSelector";
import Grid from "@mui/material/Grid";
import PostCard from "../Components/PostCard";

function UserShow({currentUser}) {
    const {name, postcards } = currentUser

    console.log(postcards)
    console.log(name)
    return (
        <>
            <Box sx={{width: "100%"}} >
                <Typography component="h2" variant="h4" gutterBottom sx={{marginTop: '16px'}}>
                    Hi there {name}!
                </Typography>
                <Grid container spacing={4} sx={{ padding: "0 24px 0 24px" }}>
                    {postcards.map((postcard) => (

                        <Grid item display="flex" key={postcard.id}>
                            <PostCard postcard={postcard} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    );
}

export default UserShow;