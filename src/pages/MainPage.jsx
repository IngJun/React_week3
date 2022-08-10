import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/modules/posts';
import Button from '../components/button/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase/firebase';
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';

const MainPage = (props) => {
    const data = useSelector(state => state.posts.post_list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firebaseTest = async() => {
        const docRef = await getDocs(collection(db, 'post_list'));
        docRef.forEach((doc)=> {
            console.log(`${doc.id} => ${doc.data()}`);
        })

    }

    firebaseTest();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            <Header btn_text={<AddIcon />} btn_action={() => navigate('/posting')} />

            {data.map((post) => {
                return (
                    <PostWrapper key={post.id} >
                        <StyledH1 onClick={() => {
                            navigate('/post/' + post.id);
                        }}>{post.title}</StyledH1>
                        <Button text={<DeleteIcon />} action={() => { dispatch(deletePost(post.id)); }} />
                    </PostWrapper>
                );
            })}
        </div>
    );
}

export default MainPage;

const PostWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 1px 0;
    border: 1px solid #eee;
    border-radius: 10px;
`;

const StyledH1 = styled.h1`
    cursor: pointer;
`;