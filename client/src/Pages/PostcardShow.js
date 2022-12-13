import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Badge, Collapse, Container, List} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Avatar from "@mui/material/Avatar";
import {styled} from '@mui/material/styles';
import NewCommentForm from "../Components/NewCommentForm";
import {formatDate} from "../Components/PostCard";
import Comment from "../Components/Comment"

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


function PostcardShow({currentUser}) {
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
                setMyFavorite(data.favorites.find(({user_id}) => user_id === currentUser.id))
            });
    }, [postcardId, currentUser.id]);


    if (!isLoaded) return <h3>Greetings coming your way....</h3>;

    const {image_url, greeting, destination, user} = postcard


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
                    user_id: currentUser.id,
                })
            })
                .then((res) => {
                    if (res.ok) {
                        setFavoriteCount(favoriteCount + 1)
                        res.json().then((data) => setMyFavorite(data))
                    }
                })

        }
    }

    function handleDeletePostcard() {
        fetch(`/api/postcards/${postcardId}`, {
            method: "DELETE",
        })
            .then(() => navigate("/"))
    }


    return (
        <Container maxWidth="sm">
            <Card>
                <CardMedia
                    component="img"
                    image={image_url}
                    alt="postcard image"
                />
                <CardHeader
                    avatar={<Avatar aria-label={user.name} src={user.picture}></Avatar>}
                    title={destination.name}
                    titleTypographyProps={{variant: 'h5'}}
                    action={
                        currentUser.id === postcard.user.id ?
                            <IconButton onClick={handleDeletePostcard} color="error" >
                                <DeleteOutlineIcon/>
                            </IconButton> : null
                    }
                    subheader={formatDate(postcard.created_at)}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {greeting}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Badge badgeContent={favoriteCount} color="primary">
                        <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
                            <FavoriteIcon color={myFavorite ? 'error' : ''}/>
                        </IconButton>
                    </Badge>
                    {
                        currentUser.id === postcard.user.id ?
                            <IconButton color="error"
                                        component={Link}
                                        to={{pathname: `/postcards/${postcardId}/edit`}}
                                        state={{postcard}}
                            >
                                <EditOutlinedIcon/>
                            </IconButton> : null
                    }

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

                        <Typography variant="h6" color="text.secondary">Comments</Typography>

                        <List style={{padding:0}}>
                            {comments.map((comment) => (
                                <Comment key={comment.id}
                                         comment={comment}
                                         currentUser={currentUser}
                                         component="li"
                                         onDeleteComment={handleDelete}
                                         sx={{display:'flex', flexDirection:'row'}}  />
                            ))}
                        </List>
                        <NewCommentForm comments={comments} setComments={setComments} user={currentUser}
                                        postcard={postcard}/>
                    </CardContent>
                </Collapse>
            </Card>
        </Container>
    );
}

export default PostcardShow;