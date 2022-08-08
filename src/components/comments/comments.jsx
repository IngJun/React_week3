// Comment section
import React, { useState, useEffect, useRef } from 'react';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateComment, deleteComment, readPost } from '../../redux/modules/posts';

const Comments = ({ post_id }) => {

    const dispatch = useDispatch();
    dispatch(readPost(post_id));
    const post = useSelector(state => state.posts.currentPost);

    const new_comment_id = nextId();
    const comment_ref = useRef(null);
    const edit_ref = useRef(null);
    const [cmtcreate, setCreate] = useState(false);
    const [cmtdelete, setDelete] = useState(false);
    const [cmtupdate, setUpdate] = useState(false);
    const [comment_id, setCommentId] = useState(null);

    useEffect(() => {
        dispatch(readPost(post_id));
    }, [cmtcreate, dispatch, post_id]);

    return (
        <div>
            {/* post comment */}
            <div>
                <input type='text' ref={comment_ref} placeholder='Leave comment' />
                <button onClick={() => {
                    setCreate(!cmtcreate);
                    dispatch(createComment(post_id, { id: new_comment_id, content: comment_ref.current.value }))
                    comment_ref.current.value = '';
                }}>댓글 달기</button>
            </div>


            {/* display comments */}
            {post.comments?.map((comment) => {

                if (comment_id === comment.id && cmtupdate) {
                    return (
                        <div key={comment.id}>
                            <input ref={edit_ref} type="text" defaultValue={comment.content}/>
                            <button onClick={() => {
                                setUpdate(!cmtupdate);
                            }}>취소</button>
                            <button onClick={() => {
                                setUpdate(!cmtupdate);
                                console.log(edit_ref.current.value);
                                dispatch(updateComment(post_id, comment.id, edit_ref.current.value));
                            }}>완료</button>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={comment.id}>

                            {comment.content}
                            <button onClick={() => {
                                setUpdate(!cmtupdate);
                                setCommentId(comment.id);
                            }}>수정</button>
                            <button
                                onClick={() => {
                                    setDelete(!cmtdelete);
                                    dispatch(deleteComment(post_id, comment.id));
                                }}>삭제</button>
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default Comments;