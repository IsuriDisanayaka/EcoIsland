import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import "./style.css";

function PostAll() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/post/all')
            .then((response) => {
                const filteredPosts = response.data.filter(post => post.status === 'approved');
                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }, []);

    return (
        <div style={{ marginLeft: '50px', marginTop: '-20px' }}>
            <div className="scrollable-container" style={{ paddingLeft: '65px', paddingTop: '68px', padding: '17px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{
                    fontWeight: 'lighter', fontSize: '53px',
                    fontFamily: 'fangsong', color: '#a70d92'
                }}>Today-market</h1>
                <div style={{ margin: '25px' }} className="scrollable-content">
                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
                                <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography style={{
                                        fontWeight: 'bold',
                                        fontSize: '23px',
                                        fontFamily: 'fangsong',
                                        color: '#a92'
                                    }} variant="h6">{post.title}</Typography>
                                    <Typography > Name: {post.fristName}</Typography>
                                    <Typography>Contact: {post.contact}</Typography>
                                    <Typography>Address: {post.address}</Typography>
                                    <Typography>Price: {post.price}</Typography>

                                    <Typography style={{
                                        fontSize: '18px',
                                        fontFamily: 'fangsong',
                                        color: '#020d1e'
                                    }} variant="body2">{post.content}</Typography>
                                    <img className="post-image" src={post.imageUrl} alt="Post Image" />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div >
    );
}

export default PostAll;
