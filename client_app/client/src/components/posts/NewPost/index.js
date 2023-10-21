import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import "./style.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const firebaseConfig = {
    apiKey: "AIzaSyBNA9OznXwIJt88-bFs3mqXoiz59HPJHUA",
    authDomain: "ecoisland-1a35b.firebaseapp.com",
    projectId: "ecoisland-1a35b",
    storageBucket: "ecoisland-1a35b.appspot.com",
    messagingSenderId: "265116055269",
    appId: "1:265116055269:web:e3355eb3287a85cdffc60c",
    measurementId: "G-LQ8JGWLXQ0"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function NewPostForm({ onPostSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { t } = useTranslation();



    const id = userData.id;

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

    };



    const handlePostSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const postData = {
                id,
                title,
                content,
                price,
            };

            if (image) {
                const storageRef = ref(storage, 'images/' + image.name);
                await uploadBytes(storageRef, image);
                const imageUrl = await getDownloadURL(storageRef);
                postData.imageUrl = imageUrl;
            }

            const response = await axios.post('http://localhost:8080/api/v1/post', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            onPostSubmit(response.data);

            setTitle('');
            setContent('');
            setPrice(0);
            setImage(null);
        } catch (error) {
            console.error('Error creating post:', error);

        } finally {
            setIsLoading(false);
            setTitle('');
            setContent('');
            setPrice(0);
            document.querySelector('input[type="file"]').value = '';

            new Promise((resolve) => {
                setImage(null);


                resolve();
            }).then(() => {
                toast.success('Post created successfully!');
            });

        }
    };


    return (
        <div style={{ marginTop: '10px', marginLeft: '59px' }}>
            <h2 style={{
                fontWeight: 'lighter', fontSize: '53px',
                fontFamily: 'fangsong', color: 'rgb(13 37 167)'
            }}>{t("Create New Post")}</h2>

            <div className="new-post-form-container">

                <form onSubmit={handlePostSubmit}>
                    <div className="form-group">
                        <input
                            type="text" style={{ height: '62px' }}
                            placeholder={t("Title")}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder={t("Content")} style={{ height: '162px' }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="number" style={{ height: '35px' }}
                            placeholder={t("Price")}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file" style={{ height: '36px' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">{t("Create Post")}</button>
                    {isLoading && <div className="loading-indicator">Loading...</div>}
                </form>
            </div>
        </div>
    );
}

export default NewPostForm;
