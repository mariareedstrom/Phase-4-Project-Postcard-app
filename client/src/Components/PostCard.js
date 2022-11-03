import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";




function PostCard({postcard}) {
    const { user, image_url, greeting, destination, id } = postcard
    const {name} = postcard.user

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        navigate(`/postcards/${id}`)
    };




    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={user.name}>
                        {name}
                    </Avatar>
                }
                action={
                    <div>
                    <IconButton aria-label="settings"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                    >
                    <MenuItem onClick={handleClose}>View Details</MenuItem>

                    </Menu>
                    </div>
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
        </Card>


    );
}

export default PostCard;