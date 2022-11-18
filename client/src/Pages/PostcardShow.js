import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Collapse, Container} from "@mui/material";
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
import {styled} from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import NewCommentForm from "../Components/NewCommentForm";


const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
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
    const [favoriteCount, setFavoriteCount] = useState(0)
    const [myFavorite, setMyFavorite] = useState(null)


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
                setFavoriteCount(data.favorites.length);
                setMyFavorite(data.favorites.find(({user_id}) => user_id === user.id))
            });
    }, [postcardId]);


    if (!isLoaded) return <h3>Greetings coming your way....</h3>;

    const {image_url, greeting, destination} = postcard


    function handleDelete(comment_id) {
        return (_event) => {
            fetch(`/api/comments/${comment_id}`, {
                method: "DELETE"
            })
                .then((resp) => {
                    if (resp.status === 204) {
                        setComments(comments.filter(comment => comment.id !== comment_id))
                    }
                })
        }
    }

    function handleFavoriteClick() {

        if (myFavorite) {
            fetch(`/api/postcards/${postcardId}/favorites/${myFavorite.id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.status === 204) {
                        setFavoriteCount(favoriteCount - 1)
                        setMyFavorite(null)
                    }

                })
        } else {

            fetch(`/api/postcards/${postcardId}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                })
            })
                .then((res) => {
                    if (res.ok) {
                        setFavoriteCount(favoriteCount + 1)
                        res.json().then((data) => setMyFavorite(data) )
                    }
                })

        }
    }

    function handleDeletePostcard(){
        fetch(`/api/postcards/${postcardId}`, {
            method: "DELETE",
        })
            .then(() => navigate("/"))
    }


    return (
        <Container maxWidth="sm">

            <Card sx={{maxWidth: 500}}>
                <CardHeader
                    avatar={ <Avatar  aria-label={user.name} src={user.picture}></Avatar>}
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
                    <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
                        <FavoriteIcon htmlColor={myFavorite ? 'red' : ''}/>
                        <span>{favoriteCount}</span>
                    </IconButton>

                    {user.id === postcard.user.id ? <Button onClick={handleDeletePostcard} variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button> : null}

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Comments:</Typography>

                        {comments.map((comment) =>
                            (<Typography paragraph>
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