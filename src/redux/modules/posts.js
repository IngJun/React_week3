// posts.js
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
    current_comments: [],
};


// action types
const LOADPOSTS = 'posts/loadPosts';
const CREATEPOST = 'posts/createPost';
const READPOST = 'posts/readPost';
const UPDATEPOST = 'posts/updatePost';
const DELETEPOST = 'posts/deletePost';

const LOADCOMMENTS = 'comments/loadComments';
const CREATECOMMENT = 'posts/createComment';
const READCOMMENTS = 'posts/readComments';
const UPDATECOMMENT = 'posts/updateComment';
const DELETECOMMENT = 'posts/deleteComment';


// action creators

// posts = [{}, {}, {}, ...]
export const loadPosts = (posts) => {
    return { type: LOADPOSTS, posts };
}

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

// comments = [{}, {}, {}, ...]
export const loadComments = (comments) => {
    return { type: LOADCOMMENTS, comments };
};

// comment = {post_id: '', content: ''}
export const createComment = (comment_id, comment) => {
    return { type: CREATECOMMENT, comment_id, comment };
}

export const readComments = (post_id) => {
    return { type: READCOMMENTS, post_id };
}

// comment_content =  ''
export const updateComment = (comment_id, comment_content) => {
    return { type: UPDATECOMMENT, comment_id, comment_content };
}

export const deleteComment = (comment_id) => {
    return { type: DELETECOMMENT, comment_id };
}

//middleware actions
export const loadPostsFB = () => {
    console.log('loading data from firestore');
    return async function (dispatch) {

        const post_data = await getDocs(collection(db, 'post_list'));
        const post_list = [];

        post_data.forEach((doc) => {
            post_list.push({ id: doc.id, ...doc.data() });
        });

        dispatch(loadPosts(post_list));
        console.log('loaded data from firestore');
    };
}

// post = {title: '', content: ''}
export const createPostFB = (post) => {
    return async function (dispatch) {
        console.log('creating data to firestore...');

        const docRef = await addDoc(collection(db, 'post_list'), post);
        const _post = await getDoc(docRef);
        const post_data = {id: _post.id, ..._post.data()};

        console.log('creating data to firestore...');

        dispatch(createPost(post_data));
    }
}

// post = {title: '', cotent: ''}
export const updatePostFB = (post_id, post) => {
    return async function (dispatch) {
        console.log('updating data to firestore...');

        const docRef = await doc(collection(db, 'post_list'), post_id);
        await updateDoc(docRef, {...post});

        console.log('updated data to firestore');

        dispatch(updatePost(post_id, post));
        dispatch(readPost(post_id));
    }
}

export const deletePostFB = (post_id) => {
    return async function (dispatch) {
        console.log('deleting post from firebase');

        const docRef = await doc(collection(db, 'post_list'), post_id);
        await deleteDoc(docRef);

        console.log('deleted post from firebase');

        dispatch(deletePost(post_id));
    }
}

export const loadCommentsFB = () => {
    return async function (dispatch) {
        console.log('loading comments from firestore');

        const comment_data = await getDocs(collection(db, 'comment_list'));
        const comment_list = [];

        comment_data.forEach((doc) => {
            comment_list.push({ id: doc.id, ...doc.data() });
        });

        console.log('loaded comments from firestore');

        dispatch(loadComments(comment_list));
    };
}

// comment = {post_id: '', content: ''}
export const createCommentFB = (comment) => {
    return async function (dispatch) {
        console.log('creating comments to firestore');

        const docRef = await addDoc(collection(db, 'comment_list'), comment);
        const _comment = await getDoc(docRef);

        console.log('created comments to firestore');

        dispatch(createComment(_comment.id, _comment.data()));
    }
}

// comment_content =  ''
export const updateCommentFB = (comment_id, comment_content) => {
    return async function (dispatch) {
        console.log('updating comment in firestore');

        const docRef = await doc(collection(db, 'comment_list'), comment_id);
        await updateDoc(docRef, { content: comment_content });

        console.log('updated comment in firestore');

        dispatch(updateComment(comment_id, comment_content));
    }
}

export const deleteCommentFB = (comment_id) => {
    return async function (dispatch) {

        const docRef = await doc(collection(db, 'comment_list'), comment_id);
        await deleteDoc(docRef);

        dispatch(deleteComment(comment_id));
    }
}


// reducer

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case LOADPOSTS: {
            console.log('loading posts');
            return { ...state, post_list: action.posts };
        }
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

        case LOADCOMMENTS: {
            console.log('loading comments');
            return { ...state, comment_list: action.comments };
        }
        case CREATECOMMENT: {
            console.log('creating comment');
            const new_comment_list = [...state.comment_list,
            { id: action.comment_id, ...action.comment }]
            return { ...state, comment_list: new_comment_list };
        }
        case READCOMMENTS: {
            console.log('reading comments');
            const current_comments = state.comment_list.filter((comment) => comment.post_id === action.post_id);
            return { ...state, current_comments: [...current_comments] };
        }
        case UPDATECOMMENT: {
            console.log('updating comment');
            const new_comment_list = state.comment_list.map((comment) => {
                if (comment.id === action.comment_id) {
                    return { ...comment, content: action.comment_content }
                } else {
                    return comment;
                }
            })
            return { ...state, comment_list: new_comment_list };
        }
        case DELETECOMMENT: {
            console.log('deleting comment');
            const new_comment_list = state.comment_list.filter((comment) => comment.id !== action.comment_id)
            return { ...state, comment_list: new_comment_list };
        }
        default: return state;
    }
}
