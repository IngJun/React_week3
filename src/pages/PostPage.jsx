import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { readPost, updatePost } from '../redux/modules/posts';

const PostPage = (props) => {

    const title_ref = useRef(null);
    const content_ref = useRef(null);

    const [edit, setEdit] = useState(false);

    const params = useParams();
    const dispatch = useDispatch();
    dispatch(readPost(params.id));
    const navigate = useNavigate();
    const post = useSelector(state => state.posts.currentPost);
    console.log(post);


    React.useEffect(() => {
        console.log(edit);
    }, [edit]);

    return (
        <div>
            <Header />
            <button onClick={() => { navigate(-1); }}>뒤로가기</button>

            {!edit
                ?
                <>
                    <button onClick={()=>{setEdit(!edit)}}>게시글 수정</button>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </>
                :
                <>
                    <button onClick={()=>{setEdit(!edit)}}>취소</button>
                    <button onClick={() => {
                        dispatch(updatePost({title: title_ref.current.value, content: content_ref.current.value}, post.id));
                        setEdit(!edit);
                    }}>수정</button>
                    제목: <input ref={title_ref}/>
                    내용: <textarea ref={content_ref}/>
                </>
            }
        </div >
    );
}

export default PostPage;