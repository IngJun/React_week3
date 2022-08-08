import React from 'react';
import nextId from 'react-id-generator';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import { createPost } from '../redux/modules/posts';

const PostingPage = (props) => {
    const id = nextId();
    const navigate= useNavigate();
    const data = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const title_ref = React.useRef(null);
    const content_ref = React.useRef(null);

    const makeNewPost = () => {
        if (title_ref.current.value.length === 0 ||
            content_ref.current.value.length <= 10) {
            window.alert('The content is too short or title is missing');
            return;
        }
        dispatch(createPost(
            {
                id: id,
                title: title_ref.current.value,
                content: content_ref.current.value
            }));
        title_ref.current.value = '';
        content_ref.current.value = '';
        navigate('/');
    }

    React.useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            <Header />
            제목 <input type="text" ref={title_ref} />
            내용 <textarea ref={content_ref} />
            <button onClick={makeNewPost}>추가</button>
            <button onClick={()=>{navigate('/')}}>취소</button>
        </div>
    );
}

export default PostingPage;