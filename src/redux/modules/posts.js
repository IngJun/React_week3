// posts.js

const initialState = {
    post_list: [
        {
            id: '1',
            title: 'post example',
            content: 'content example',
        }
    ],
    comment_list: [
        { post_id: '1', id: '1', content: 'comments example 1' },
        { post_id: '1', id: '2', content: 'comments example 2' },
        { post_id: '1', id: '3', content: 'comments example 3' },
        { post_id: '1', id: '4', content: 'comments example 4' }
    ],
    current_post: {},
    current_comment: {},
};


// action types
const CREATEPOST = 'posts/createPost';
const READPOST = 'posts/readPost';
const UPDATEPOST = 'posts/updatePost';
const DELETEPOST = 'posts/deletePost';

const CREATECOMMENT = 'posts/createComment';
const READCOMMENT = 'posts/readComment';
const UPDATECOMMENT = 'posts/updateComment';
const DELETECOMMENT = 'posts/deleteComment';


// action creators

// post = {id='', title: '', content: ''}
export const createPost = (post) => {
    return { type: CREATEPOST, post };
}

export const readPost = (post_id) => {
    return { type: READPOST, post_id };
}

// post = {title: '', content: ''}
export const updatePost = (post_id, post) => {
    return { type: UPDATEPOST, post_id, post };
}

export const deletePost = (post_id) => {
    return { type: DELETEPOST, post_id };
}

// comment = {id: '', content: ''}
export const createComment = (post_id, comment) => {
    return { type: CREATECOMMENT, post_id, comment };
}

export const readComment = (post_id, comment_id) => {
    return { type: READCOMMENT, post_id, comment_id };
}

// comment_content =  ''
export const updateComment = (post_id, comment_id, comment_content) => {
    return { type: UPDATECOMMENT, post_id, comment_id, comment_content };
}

export const deleteComment = (post_id, comment_id) => {
    return { type: DELETECOMMENT, post_id, comment_id };
}


// reducer

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case CREATEPOST: {
            console.log('creating post');
            const new_post = { ...action.post };
            const new_post_list = [...state.post_list, new_post];
            return { ...state, post_list: new_post_list };
        }
        case READPOST: {
            console.log('reading post');
            const current_post = state.post_list.find((post) => post.id === action.post_id);
            return { ...state, current_post: current_post };
        }
        case UPDATEPOST: {
            console.log('updating post');
            const updated_post_list = state.post_list.map((post) => {
                if (post.id === action.post_id) {
                    return { ...post, title: action.post.title, content: action.post.content }
                } else {
                    return post;
                }
            })
            return { ...state, post_list: updated_post_list };
        }
        case DELETEPOST: {
            console.log('deleting post');
            const new_post_list = state.post_list.filter((post) => post.id !== action.post_id);
            return { ...state, post_list: new_post_list };
        }
        case CREATECOMMENT: {
            console.log('creating comment');
            const new_comment_list = [...state.comment_list,
            { post_id: action.post_id, ...action.comment }]
            return { ...state, comment_list: new_comment_list };
        }
        case READCOMMENT: {
            console.log('reading comment');
            const current_post_comments = state.comment_list.filter((comment) => comment.post_id === action.post_id);
            const current_comment = current_post_comments.find((comment) => comment.id === action.comment_id);
            return { ...state, current_comment: current_comment };
        }
        case UPDATECOMMENT: {
            console.log('updating comment');
            const new_comment_list = state.comment_list.map((comment) => {
                if (comment.post_id === action.post_id && comment.id === action.comment_id) {
                    return { ...comment, content: action.comment_content }
                } else {
                    return comment;
                }
            })
            return { ...state, comment_list: new_comment_list };
        }
        case DELETECOMMENT: {
            console.log('deleting comment');
            const new_comment_list = state.comment_list.filter((comment) =>
                !(comment.id === action.comment_id && comment.post_id === action.post_id))
            return { ...state, comment_list: new_comment_list };
        }
        default: return state;
    }
}
