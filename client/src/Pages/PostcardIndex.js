import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import Grid from "@mui/material/Grid";


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

        <>
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