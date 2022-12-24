import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
    console.log(title, isUser);

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    };

    const deleteRequest =async() => {
        const res = await axios.delete(`http://localhost:5000/api/blog/delete/${id}`)
        .catch(err => console.log(err));
        const data = res.data;
        return data
    }
    const handleDelete = () => {
        deleteRequest()
        .then(() => navigate('/')
        .then(() => navigate('/blogs')));
    };

    return (
        <div>
            <Card sx={{
                width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc",
                ":hover": { boxShadow: "15px 15px 30px #ccc" },
            }}>
                {isUser && (
                    <Box display='flex'>
                        <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }} ><ModeEditOutlineIcon color='warning'/></IconButton>
                        <IconButton onClick={handleDelete} ><DeleteOutlineIcon color='error'/></IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            {/* {userName} */}
                        </Avatar>
                    }

                    title={title}
                />
                <CardMedia
                    component="img"
                    height="500"
                    src={imageURL}
                    alt="picture"
                />
               
                <CardContent>
                    <hr/>
                    <br/>
                    <Typography variant="body2" color="blue" fontSize={20}>
                        <b> {userName} </b> {':'}  {description}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default Blog