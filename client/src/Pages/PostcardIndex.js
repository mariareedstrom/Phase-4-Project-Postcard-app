import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PostCard from "../Components/PostCard";
import { Box } from "@mui/material"
import DestinationSelector from "../Components/DestinationSelector"




function PostcardIndex({currentUser}) {
    const [postcards, setPostcards] = useState([])
    const [destinations, setDestinations] =useState(["Austin", "Houston", "Oslo", "Malaga"])

    useEffect(() => {
        fetch('/api/postcards')
            .then((res) => res.json())
            .then((postcards) => {
                setPostcards(postcards)
            })

    }, [])


    return (

        <>
            <Box >
                <DestinationSelector destinations={destinations}/>
            </Box>

            <Grid container spacing={4} sx={{ padding: "0 24px 0 24px" }}>
                {postcards.map((postcard) => (

                    <Grid item display="flex" key={postcard.id}>
                        <PostCard postcard={postcard} />
                    </Grid>
                ))}
            </Grid>
        </>

    );
}

export default PostcardIndex;