// posts.js

const initialState = {
    list: [
        {
            id: '1',
            title: 'post example',
            content: 'content example',
            comments: [
                { id: '1', content: 'comments example 1' },
                { id: '2', content: 'comments example 2' },
                { id: '3', content: 'comments example 3' },
                { id: '4', content: 'comments example 4' }
            ],
        }
    ],
    currentPost: {},
    currentComment: {},
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
            const new_post = { ...action.post, comments: [] };
            const new_post_list = [...state.list, new_post];
            return { ...state, list: new_post_list };
        }
        case READPOST: {
            console.log('reading post');
            const current_post = state.list.find((post) => post.id === action.post_id);
            return { ...state, currentPost: current_post };
        }
        case UPDATEPOST: {
            console.log('updating post');
            const updated_post_list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    return { ...post, title: action.post.title, content: action.post.content }
                } else {
                    return post;
                }
            })
            return { ...state, list: updated_post_list };
        }
        case DELETEPOST: {
            console.log('deleting post');
            const new_post_list = state.list.filter((post) => post.id !== action.post_id);
            return { ...state, list: new_post_list };
        }
        case CREATECOMMENT: {
            console.log('creating comment');
            const new_post_list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    let new_comments;
                    if (post.comments.length !== 0) {
                        new_comments = [...post.comments, action.comment];
                    } else {
                        new_comments = [action.comment];
                    }
                    return { ...post, comments: new_comments };
                } else {
                    return post;
                }
            })
            return { ...state, list: new_post_list };
        }
        case READCOMMENT: {
            console.log('reading comment');
            const current_post = state.list.find((post) => post.id === action.post_id);
            const current_comment = current_post.comments.find((comment) => comment.id === action.comment_id);
            return { ...state, currentComment: current_comment };
        }
        case UPDATECOMMENT: {
            console.log('updating comment');
            const new_post_list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    const new_comments = post.comments.map((comment) => {
                        if (comment.id === action.comment_id) {
                            return { ...comment, content: action.comment_content };
                        } else {
                            return comment;
                        }
                    });
                    return { ...post, comments: new_comments };
                } else {
                    return post;
                }
            })
            return { ...state, list: new_post_list };
        }
        case DELETECOMMENT: {
            console.log('deleting comment');
            const new_post_list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    const new_comments = post.comments.filter((comment) => comment.id !== action.comment_id);
                    return { ...post, comments: new_comments };
                } else {
                    return post;
                }
            })
            return { ...state, list: new_post_list };
        }
        default: return state;
    }
}
