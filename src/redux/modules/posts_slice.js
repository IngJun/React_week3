// posts.js
import { createSlice } from '@reduxjs/toolkit';


export const postSlice = createSlice({
    name: 'posts',
    initialState: {
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
    },
    reducers: {
        createPost: (state, action) => {
            console.log('creating post');
            const new_post = { ...action.post, comments: [] };
            state.list = [...state.list, new_post];
        },
        readPost: (state, action) => {
            console.log('reading post');
            state.currentPost = state.list.find((post) => post.id === action.post_id);
        },
        updatePost: (state, action) => {
            console.log('updating post');
            state.list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    return { ...post, title: action.post.title, content: action.post.content }
                } else {
                    return post;
                }
            })
        },
        deletePost: (state, action) => {
            console.log('creating comment');
            state.list = state.list.map((post) => {
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
        },
        createComment: (state, action) => {
            console.log('creating comment');
            state.list = state.list.map((post) => {
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
        },
        readComment: (state, action) => {
            console.log('reading comment');
            const current_post = state.list.find((post) => post.id === action.post_id);
            state.currentComment = current_post.comments.find((comment) => comment.id === action.comment_id);
        },
        updateComment: (state, action) => {
            console.log('updating comment');
            state.list = state.list.map((post) => {
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
        },
        deleteComment: (state, action) => {
            console.log('deleting comment');
            state.list = state.list.map((post) => {
                if (post.id === action.post_id) {
                    const new_comments = post.comments.filter((comment) => comment.id !== action.comment_id);
                    return { ...post, comments: new_comments };
                } else {
                    return post;
                }
            })
        }
    }
})

export const {createPost, readPost, updatePost, deletePost, 
    createComment, readComment, updateComment, deleteComment} = postSlice.actions;

export default postSlice.reducer;