import React, { useRef, useState } from 'react';
import nextId from 'react-id-generator';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { createComment, deleteComment, readPost, updatePost } from '../redux/modules/posts';

const PostPage = (props) => {
    const new_comment_id = nextId();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title_ref = useRef(null);
    const content_ref = useRef(null);
    const comment_ref = useRef(null);

    const [postedit, setPostEdit] = useState(false);
    const [cmtedit, setCmtEdit] = useState(false);
    const [comment_change, setCommentChange] = useState(false);

    let post = useSelector(state => state.posts.currentPost);
    console.log(post);

    const editPost = () => {
        console.log(title_ref.current.value, content_ref.current.value);
        dispatch(updatePost(post.id, { title: title_ref.current.value, content: content_ref.current.value }));
        setPostEdit(!postedit);
    }

    React.useEffect(() => {
        console.log(postedit);
        dispatch(readPost(params.id));
        
    }, [cmtedit, postedit, params, comment_change, dispatch]);

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
            
            {/* post comment */}
            <div>
                <input type='text' ref={comment_ref} placeholder='Leave comment'/>
                <button onClick={()=> {
                    setCommentChange(!comment_change);
                    dispatch(createComment(params.id, {id: new_comment_id, content: comment_ref.current.value}))
                    comment_ref.current.value = '';
                }}>댓글 달기</button>
            </div>


            {/* display comments */}
            {post.comments?.map((comment)=> {
                return (
                    <div key={comment.id}>

                        {comment.content}
                        <button onClick={()=>{
                            setCmtEdit(!cmtedit);
                            dispatch()
                        }}>수정</button>
                        <button
                        onClick={()=> {
                            setCommentChange(!comment_change);
                            dispatch(deleteComment(params.id, comment.id));
                        }}>삭제</button>
                    </div>
                )
            })}


        </div >
    );
}

export default PostPage;