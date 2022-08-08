import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/modules/posts';

const MainPage = (props) => {
    const data = useSelector(state => state.posts.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(data);
    }, [data]);

    return (
        <div>
            <Header />
            <button onClick={() => { navigate('/posting'); }}>게시글 등록</button>

            {data.map((post) => {
                return (
                    <div key={post.id} >
                        <h1 onClick={() => {
                            navigate('/post/' + post.id);
                        }}>{post.title}</h1>
                        <button onClick={() => { dispatch(deletePost(post.id)); }}>게시글 삭제</button>
                    </div>
                );
            })}
        </div>
    );
}

export default MainPage;