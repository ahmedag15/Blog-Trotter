import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'

const Blog = ({title, description, imageURL, username}) => {
    return (
        <div>
            {" "}
            <Card sx={{
                width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
                    boxShadow: "15px 15px 30px #ccc"
                },
            }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            {username}
                        </Avatar>
                    }

                    title={title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageURL}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default Blog