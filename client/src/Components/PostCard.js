import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";


function PostCard({postcard}) {
    const {user, image_url, greeting, destination, id, created_at} = postcard


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

    function formatDate(date) {
        const event = new Date(date)
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        const locale = document.querySelector('html').lang

        return event.toLocaleDateString(locale, options)
    }


    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar aria-label={user.name} src={user.picture}></Avatar>
                }
                action={
                    <Box>
                        <IconButton aria-label="settings"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                        >
                            <MoreVertIcon/>
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
                    </Box>
                }
                title={destination.name}

                subheader={formatDate(created_at)}
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