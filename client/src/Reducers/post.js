import {
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    GET_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../constants/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}


export const Posts = (state= initialState,action) => {
    const { type, payload} = action;


    switch(type) {

        case GET_POSTS:

        return {
            ...state,
            posts :payload,
            loading:false
        };
        break;
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        break;
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state,comments: payload},
                loading: false
            }
        break;

        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        break;
        case ADD_POST:
            return {
                ...state,
                posts: [...state.post,payload],
                loading: false
            }
        break;
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading:false
            };
        break;
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? {
                    ...post,likes: payload.likes
                }: post),
                loading: false
            }
        break;
        default:
            return state;
    }
}