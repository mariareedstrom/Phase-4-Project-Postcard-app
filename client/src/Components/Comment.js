import React from 'react';
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "@mui/material/Avatar";

function formatDate(date) {
    const event = new Date(date)
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'}
    const locale = document.querySelector('html').lang

    return event.toLocaleDateString(locale, options)
}

function Comment(props) {
    const {comment, onDeleteComment, currentUser, ...boxProps} = props;


    return (
        <Box {...boxProps} >
            <Avatar src={comment.user.picture} />
            <Box display="block" flex={1} margin={2}>
                <Typography >
                    {comment.user.name}
                </Typography>
            <Typography variant={"overline"}>
                    {formatDate(comment.created_at)}
            </Typography>

                <Typography>
                    {comment.content}
                </Typography>
            </Box>
            {
                comment.user.id === currentUser.id ?
                <IconButton onClick={onDeleteComment(comment.id)} sx={{alignContent: "right"}}>
                    <DeleteOutlineIcon color="error" />
                </IconButton>
                    : null
            }
        </Box >
    );
}

export default Comment;

