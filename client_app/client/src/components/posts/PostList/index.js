import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';


function PostList() {
  const [posts, setPosts] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [noNewPosts, setNoNewPosts] = useState(false);
  const { t } = useTranslation();

  const fetchPendingPosts = () => {
    axios.get('http://localhost:8080/api/v1/post/all')
      .then((response) => {
        const filteredPosts = response.data.filter(post => post.status === 'pending');
        setPosts(filteredPosts);

        if (filteredPosts.length === 0) {
          setNoNewPosts(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const verifyPost = (post) => {
    localStorage.setItem('selectedPostId', post.postId);

    setSelectedPost(post);
    setShowConfirmationModal(true);
  }

  const handleConfirm = () => {
    const selectedPostId = localStorage.getItem('selectedPostId');
    if (selectedPostId) {
      axios.put(`http://localhost:8080/api/v1/post/${selectedPostId}/verify`)
        .then((response) => {

          const updatedPosts = posts.filter(post => post.postId !== selectedPostId);
          setPosts(updatedPosts);
          setShowConfirmationModal(false);
          setSelectedPost(null);
          localStorage.removeItem('selectedPostId');
          fetchPendingPosts();

        })
        .catch((error) => {
          console.error('Error verifying post:', error);
        });
    } else {
      console.error('No selectedPostId found in local storage');
    }
  }

  const handleCloseModal = () => {
    localStorage.removeItem('selectedPostId');
    setShowConfirmationModal(false);
    setSelectedPost(null);
  }

  return (
    <div style={{ paddingLeft: '65px', marginTop: '1px' }}>
      <h1 style={{
        fontWeight: 'lighter', fontSize: '53px',
        fontFamily: 'fangsong', color: '#a70d92'
      }}> {t("Posts For Approval")}</h1>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {noNewPosts ? (
          <div style={{
            background: '#f0f0f0',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            height: '53vh',
            color: 'rgb(4 6 5 / 14%)'
          }}>
            <p style={{ textAlign: 'center', paddingTop: '207px', fontFamily: 'cursive', fontSize: 'x-large' }}>No new posts to approve at the moment.</p>
          </div>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{t("User Name")}: {post.fristName}</Typography>
                  <Typography>{t("Contact")} : {post.contact}</Typography>
                  <Typography>{t("Address")}: {post.address}</Typography>
                  <Typography>{t("Price")}: {post.price}</Typography>
                  <Typography variant="body2">{post.content}</Typography>
                  <img className="post-image" src={post.imageUrl} alt="Post Image" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <IconButton color="primary">
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <Button variant="contained" color="primary" onClick={() => verifyPost(post)}>
                      Verify
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Modal
        open={showConfirmationModal}
        onClose={handleCloseModal}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'white',
          width: '300px',
          height: '200px'
        }}
      >
        <div className="confirmation-modal">
          <h2>Verify Post</h2>
          {selectedPost && (
            <div>
              <p>Are you sure you want to verify the post titled "{selectedPost.title}"?</p>
              <Button variant="contained" color="primary" onClick={handleConfirm}>
                Yes
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                No
              </Button>
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}

export default PostList;
