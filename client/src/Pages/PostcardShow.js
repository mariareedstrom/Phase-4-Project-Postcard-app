import React, {useEffect, useState} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import {Collapse, Container} from "@mui/material";
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
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NewCommentForm from "../Components/NewCommentForm";



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



function PostcardShow({user}) {
    const [postcard, setPostcard] = useState(null)
    const [comments, setComments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(null)
    const [expanded, setExpanded] = useState(false);

    const postcardId = useParams().id
    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        fetch(`/api/postcards/${postcardId}`)
            .then((resp) => resp.json())
            .then((data) => {
                setPostcard(data);
                setComments(data.comments);
                setIsLoaded(true);
            });
    }, [postcardId]);


    if (!isLoaded) return <h3>Greetings coming your way....</h3>;

    const {image_url, greeting, destination } = postcard


    function handleDelete(comment_id){
        return (_event) => {
            fetch(`/api/comments/${comment_id}`,{
                        method: "DELETE"
                    })
                .then((resp) => {
                    if (resp.status === 204) {
                        setComments(comments.filter(comment => comment.id !== comment_id))
                    }
                })
        }
    }

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

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Comments:</Typography>

                        { comments.map((comment) =>
                           ( <Typography paragraph>
                               {comment.content}
                               -{comment.user.name}
                               {comment.user.id === user.id ?
                                   <DeleteOutlineIcon onClick={handleDelete(comment.id)}/>
                                   : null
                               }
                            </Typography>))
                        }
                        <NewCommentForm comments={comments} setComments={setComments} user={user} postcard={postcard}/>
                    </CardContent>
                </Collapse>
            </Card>


        </Container>
    );
}

export default PostcardShow;