import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { readPost, updatePost } from '../redux/modules/posts';
import Comments from '../components/comments/comments';

const PostPage = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title_ref = useRef(null);
    const content_ref = useRef(null);


    const [postedit, setPostEdit] = useState(false);


    const post = useSelector(state => state.posts.currentPost);
    console.log(post);

    const editPost = () => {
        console.log(title_ref.current.value, content_ref.current.value);
        dispatch(updatePost(post.id, { title: title_ref.current.value, content: content_ref.current.value }));
        setPostEdit(!postedit);
    }

    React.useEffect(() => {
        console.log(postedit);
        dispatch(readPost(params.id));

    }, [postedit, params, dispatch]);

    return (
        <div>
            <Header />
            <button onClick={() => { navigate(-1); }}>뒤로가기</button>

            {!postedit
                ?
                <>
                    <button onClick={() => { setPostEdit(!postedit) }}>게시글 수정</button>
                    <h1>{post.title}</h1>
                    <pre>{post.content}</pre>
                </>
                :
                <>
                    <button onClick={() => { setPostEdit(!postedit) }}>취소</button>
                    <button onClick={editPost}>수정</button>
                    제목: <input ref={title_ref} defaultValue={post.title}></input>
                    내용: <textarea ref={content_ref} defaultValue={post.content}></textarea>
                </>
            }

            <Comments post_id={params.id}/>

        </div >
    );
}

export default PostPage;