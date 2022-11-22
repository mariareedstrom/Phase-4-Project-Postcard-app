import React from 'react';
import {Link} from "react-router-dom";
import {Box, Typography, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import PostCard from "../Components/PostCard";

function UserShow({currentUser}) {
    const {name, postcards, id, comments} = currentUser
    const destinations = postcards.map(card => card.destination)


    return (
        <Box>
            < Box sx={{maxWidth: "550px", margin: "0 auto"}}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <Box sx={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        display: "flex"
                    }}>
                        <img alt='user'
                             style={{
                                 minHeight: " 100%",
                                 minWidth: "100%",
                                 objectFit: "cover"
                             }}
                             src={currentUser.picture}/>
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{marginTop: '16px'}}>
                            Postcards from {name}
                        </Typography>

                        {currentUser ?
                            <Button component={Link} to={{pathname: `/users/${id}/edit`, state: {name: name}}}> Edit
                                Profile</Button> : null}

                        <Box style={{display: "flex", justifyContent: "space-between", width: "108%"}}>
                            <Typography variant="overline" gutterBottom sx={{marginTop: '16px'}}>
                                {postcards.length} Postcards
                            </Typography>
                            <Typography variant="overline" gutterBottom sx={{marginTop: '16px'}}>
                                {destinations.length} Destinations
                            </Typography>
                            <Typography variant="overline" gutterBottom sx={{marginTop: '16px'}}>
                                {comments.length} Comments
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Grid container spacing={4}>
                {postcards.map((postcard) => (

                    <Grid item display="flex" key={postcard.id}>
                        <PostCard postcard={postcard}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default UserShow;