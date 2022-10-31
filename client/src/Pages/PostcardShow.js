import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Container, Menu, MenuItem} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function PostcardShow({user}) {
    const [postcard, setPostcard] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)

    const postcardId = useParams().id
    const navigate = useNavigate()



    useEffect(() => {
        fetch(`/api/postcards/${postcardId}`)
            .then((resp) => resp.json())
            .then((data) => {
                setPostcard(data);
                setIsLoaded(true);
            });
    }, [postcardId]);


    if (!isLoaded) return <h3>Greetings coming your way....</h3>;

    const {image_url, greeting, destination } = postcard


    return (
        <Container maxWidth="sm">

            <Card sx={{ maxWidth: 500 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label={user.name}>
                            {user.name}
                        </Avatar>
                    }
                    title={destination.name}

                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image_url}
                    alt="postcard image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {greeting}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="comment">
                        <CommentIcon />
                    </IconButton>
                </CardActions>
            </Card>


        </Container>
    );
}

export default PostcardShow;