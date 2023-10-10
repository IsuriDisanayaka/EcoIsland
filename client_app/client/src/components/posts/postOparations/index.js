import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../PostList';
import UpdatePostForm from '../UpdatePostForm';

function PostOparations() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        axios.get('/api/v1/post') 
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handlePostSubmit = (newPostData) => {
        axios.post('http://localhost:8080/api/v1/post', newPostData)
            .then((response) => {
                setPosts([...posts, response.data]);
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            });
    };

    const handleUpdate = (updatedPostData) => {
        axios.put(`http://localhost:8080/api/v1/post/${selectedPost.postId}`, updatedPostData) 
            .then((response) => {
                const updatedPosts = posts.map((post) => (post.postId === response.data.postId ? response.data : post));
                setPosts(updatedPosts);
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/v1/post/${selectedPost.postId}`) 
            .then(() => {
                const updatedPosts = posts.filter((post) => post.postId !== selectedPost.postId);
                setPosts(updatedPosts);
                setSelectedPost(null);
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <div>
            <h1>Post Management</h1>
            <PostList posts={posts} onSelectPost={setSelectedPost} />
            {selectedPost && (
                <div>
                    <UpdatePostForm post={selectedPost} onUpdate={handleUpdate} />
                    <button onClick={handleDelete}>Delete Post</button>
                </div>
            )}
        </div>
    );
}

export default PostOparations;
