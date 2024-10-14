import React, {useEffect, useState} from 'react';
import {Container, PostForm} from '../components';
import appwriteService from '../appwrite/config';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {

    const [post, setPost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug)
            .then((post) => {
                if(post){
                    setPost(post);                    
                }
            });
        }
        else{
            navigate('/');
        }
    }, [slug, navigate]);

    if(post.length === 0){
        return <div>Loading...</div>;
    }

    return post.length !== 0 && (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}

export default EditPost;
