// posts.js
import { createSlice } from '@reduxjs/toolkit';


export const postSlice = createSlice({
    name: 'posts',
    initialState: {
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
    },
    reducers: {
        createPost: (state, action) => {
            console.log('creating post');
            const new_post = { ...action.post };
            state.post_list = [...state.post_list, new_post];
        },
        readPost: (state, action) => {
            console.log('reading post');
            state.current_post = state.post_list.find((post) => post.id === action.post_id);
        },
        updatePost: (state, action) => {
            console.log('updating post');
            state.post_list = state.post_list.map((post) => {
                if (post.id === action.post_id) {
                    return { ...post, title: action.post.title, content: action.post.content }
                } else {
                    return post;
                }
            });
        },
        deletePost: (state, action) => {
            console.log('deleting post');
            state.post_list = state.post_list.filter((post) => post.id !== action.post_id);
        },
        createComment: (state, action) => {
            console.log('creating comment');
            state.comment_list = [...state.comment_list,
            { post_id: action.post_id, ...action.comment }];
        },
        readComment: (state, action) => {
            console.log('reading comment');
            const current_post_comments = state.comment_list.filter((comment) => comment.post_id === action.post_id);
            state.current_comment = current_post_comments.find((comment) => comment.id === action.comment_id);
        },
        updateComment: (state, action) => {
            console.log('updating comment');
            state.comment_list = state.comment_list.map((comment) => {
                if (comment.post_id === action.post_id && comment.id === action.comment_id) {
                    return { ...comment, content: action.comment_content }
                } else {
                    return comment;
                }
            });
        },
        deleteComment: (state, action) => {
            console.log('deleting comment');
            state.comment_list = state.comment_list.filter((comment) =>
                !(comment.id === action.comment_id && comment.post_id === action.post_id))
        }
    }
})

export const { createPost, readPost, updatePost, deletePost,
    createComment, readComment, updateComment, deleteComment } = postSlice.actions;

export default postSlice.reducer;