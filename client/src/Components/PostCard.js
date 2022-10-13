import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';




function PostCard({postcard}) {
    const { user, image_url, greeting, destination } = postcard
    const {name} = postcard.user




    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={user.name}>
                        {name}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title= {destination.name}

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
                <IconButton aria-label="share">
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>


        // <div>
        //     <h4> Enjoy this postcard from: {postcard.user.name} </h4>
        //     <h5> Destination: {postcard.destination.name}</h5>
        //     <img alt={postcard.id} src={postcard.image_url} />
        //     <p>
        //         {postcard.greeting}
        //     </p>
        // </div>
    );
}

export default PostCard;