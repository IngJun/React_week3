// posts.js

const initialState = {
    list: [
        {
            title:'post example',
            content: 'content example',

        }
    ],
    currentPost:{},
};


// action types
const CREATEPOST = 'posts/createPost';
const UPDATEPOST = 'posts/updatePost';
const DELETEPOST = 'posts/deletePost';

const CREATECOMMENT = 'posts/createComment';
const UPDATECOMMENT = 'posts/updateComment';
const DELETECOMMENT = 'posts/deleteComment';


// action creators
