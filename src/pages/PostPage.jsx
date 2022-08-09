import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/Header';
import { readPost, updatePost } from '../redux/modules/posts';
import Comments from '../components/comments/Comments';
import Button from '../components/button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const PostPage = (props) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title_ref = useRef(null);
    const content_ref = useRef(null);


    const [postedit, setPostEdit] = useState(false);


    const post = useSelector(state => state.posts.current_post);
    console.log(post);

    const editPost = () => {
        if(!/\S/.test(title_ref.current.value) || !/\S/.test(content_ref.current.value)) {
            window.alert('Title or Content is empty!');
            return;
        }
        dispatch(updatePost(post.id, { title: title_ref.current.value, content: content_ref.current.value }));
        setPostEdit(!postedit);
    }

    React.useEffect(() => {
        console.log(postedit);
        dispatch(readPost(params.id));

    }, [postedit, params, dispatch]);

    return (
        <div>
            <Header btn_text={<ArrowBackIcon />} btn_action={() => { navigate(-1); }} />

            {!postedit
                ?
                <>
                    <PostWrapper>
                        <ButtonGroup>
                            <Button text={<EditIcon />} action={() => { setPostEdit(!postedit) }} />
                        </ButtonGroup>
                        <h1>{post.title}</h1>
                        <StyledPre>{post.content}</StyledPre>
                    </PostWrapper>
                </>
                :
                <>
                    <PostWrapper>
                        <ButtonGroup>
                            <Button text={<CloseIcon />} action={() => { setPostEdit(!postedit) }} />
                            <Button text={<CheckIcon />} action={editPost} />
                        </ButtonGroup>
                        <div>
                            <StyledLabel htmlFor='title-input'>제목</StyledLabel><br />
                        </div>
                        <StyledInput ref={title_ref} defaultValue={post.title} id='title-input' />
                        <div>
                            <StyledLabel htmlFor='content-input'>내용</StyledLabel><br />
                            <StyledTextArea ref={content_ref} defaultValue={post.content} id='content-input' />
                        </div>
                    </PostWrapper>
                </>
            }

            <Comments post_id={params.id} />

        </div >
    );
}

export default PostPage;

const PostWrapper = styled.div`
    box-sizing: border-box;
    padding: 20px;
`;

const StyledPre = styled.pre`
    font-size: 20px;
`;

const StyledLabel = styled.label`
    font-size: 20px;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    margin: 0px;
    border: 1 solid #eee;
    border-radius: 10px;
    font-size: 20px;
`;

const StyledTextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    margin: 0px;
    border: 1 solid #eee;
    border-radius: 10px;
    font-size: 20px;
    resize: vertical;
`;

const ButtonGroup = styled.div`
    text-align: right;
`;
