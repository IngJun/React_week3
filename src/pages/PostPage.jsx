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
    const navigate = useNavigate();
    let post = useSelector(state => state.posts.currentPost);
    console.log(post);

    const editPost = () => {
        console.log(title_ref.current.value, content_ref.current.value);
        dispatch(updatePost(post.id, { title: title_ref.current.value, content: content_ref.current.value }));
        setEdit(!edit);
    }

    React.useEffect(() => {
        console.log(edit);
        dispatch(readPost(params.id));

    }, [edit, dispatch, params]);

    return (
        <div>
            <Header />
            <button onClick={() => { navigate(-1); }}>뒤로가기</button>

            {!edit
                ?
                <>
                    <button onClick={() => { setEdit(!edit) }}>게시글 수정</button>
                    <h1>{post.title}</h1>
                    <pre>{post.content}</pre>
                </>
                :
                <>
                    <button onClick={() => { setEdit(!edit) }}>취소</button>
                    <button onClick={editPost}>수정</button>
                    제목: <input ref={title_ref} defaultValue={post.title}></input>
                    내용: <textarea ref={content_ref} defaultValue={post.content}></textarea>
                </>
            }
        </div >
    );
}

export default PostPage;