// Comment section
import React, { useState, useEffect, useRef } from 'react';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createComment, updateComment, deleteComment, readComments } from '../../redux/modules/posts';
import Button from '../button/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Comments = ({ post_id }) => {
    const dispatch = useDispatch();

    const comments = useSelector(state => state.posts.current_comments);

    const new_comment_id = nextId();
    const comment_ref = useRef(null);
    const edit_ref = useRef(null);
    const [cmtcreate, setCreate] = useState(false);
    const [cmtdelete, setDelete] = useState(false);
    const [cmtupdate, setUpdate] = useState(false);
    const [comment_id, setCommentId] = useState(null);

    useEffect(() => {
        dispatch(readComments(post_id));
    }, [cmtcreate, dispatch, post_id]);

    return (
        <CommentSectionWrapper>
            {/* post comment */}
            <CommentWrapper>
                <StyledInput type='text' ref={comment_ref} placeholder='Leave a comment' />
                <Button text={<RateReviewIcon />} action={() => {
                    if(!/\S/.test(comment_ref.current.value)) {
                        window.alert('Comment is empty!');
                        return;
                    }
                    setCreate(!cmtcreate);
                    dispatch(createComment(post_id, { id: new_comment_id, content: comment_ref.current.value }))
                    comment_ref.current.value = '';
                }} />
            </CommentWrapper>

            <hr />

            {/* display comments */}
            {comments?.map((comment) => {

                if (comment_id === comment.id && cmtupdate) {
                    return (
                        <CommentWrapper key={comment.id}>

                            <StyledInput ref={edit_ref} type="text" defaultValue={comment.content} />
                            <ButtonGroup>
                                <Button text={<CloseIcon/>} action={() => {
                                    setUpdate(!cmtupdate);
                                }} />
                                <Button text={<CheckIcon/>} action={() => {
                                    if(!/\S/.test(edit_ref.current.value)) {
                                        window.alert('Comment is empty!');
                                        return;
                                    }
                                    setUpdate(!cmtupdate);
                                    console.log(edit_ref.current.value);
                                    dispatch(updateComment(post_id, comment.id, edit_ref.current.value));
                                    dispatch(readComments(post_id));
                                }} />
                            </ButtonGroup>
                        </CommentWrapper>
                    )
                }
                else {
                    return (
                        <CommentWrapper key={comment.id}>
                            <p>
                                {comment.content}
                            </p>
                            <ButtonGroup>
                                <Button text={<EditIcon />} action={() => {
                                    setUpdate(!cmtupdate);
                                    setCommentId(comment.id);
                                }} />
                                <Button text={<DeleteIcon />} action={() => {
                                    setDelete(!cmtdelete);
                                    dispatch(deleteComment(post_id, comment.id));
                                    dispatch(readComments(post_id));
                                }} />
                            </ButtonGroup>
                        </CommentWrapper>
                    )
                }
            })}
        </CommentSectionWrapper>
    );
}

export default Comments;

const CommentSectionWrapper = styled.div`
    box-sizing: border-box;
    padding: 20px;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 80%;
    padding: 5px;
    margin: 0px;
    border: 1 solid #eee;
    border-radius: 10px;
    font-size: 20px;
`;

const CommentWrapper = styled.div`
    height: 50px;
    margin: 10px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & p {
        font-size: 16px;
        height: 20px;
        padding: 0;
    }
`;

const ButtonGroup = styled.div`
    text-align: right;
`;