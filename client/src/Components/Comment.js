import React from 'react';
import {Box, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "@mui/material/Avatar";

function formatDate(date) {
    const event = new Date(date)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const locale = document.querySelector('html').lang

    return event.toLocaleDateString(locale, options)
}

function Comment(props) {
    const {comment, onDeleteComment, currentUser} = props;


    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar src={comment.user.picture}/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box
                        display='flex'
                        alignItems='baseline'
                        gap='1em'
                    >

                        <Typography
                            component="span"
                            fontWeight={'600'}
                            color="text.secondary"
                        >
                            {comment.user.name}
                        </Typography>

                        <Typography

                            component="span"
                            variant="body2"
                            color="text.secondary"
                        >
                            {formatDate(comment.created_at)}
                        </Typography>
                    </Box>
                }
                secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {comment.content}
                        </Typography>
                }
            />
            {
                comment.user.id === currentUser.id ?
                <IconButton onClick={onDeleteComment(comment.id)} sx={{alignItems: "flex-end"}}>
                    <DeleteOutlineIcon color="error" />
                </IconButton>
                    : null
            }
        </ListItem>
    )
}

export default Comment;

