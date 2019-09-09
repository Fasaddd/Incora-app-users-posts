import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    posts: [],
    comments: [],
    loading: false,
    error: null,
    showFullPost: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_USERS_SUCCESS:
            return {
                ...state,
                users: action.fetchedDataUsers,
                loading: false
            };
        case actionTypes.SHOW_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.SHOW_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SHOW_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.fetchedDataPosts,
                loading: false,
            }
        case actionTypes.SHOW_COMMENTS_SUCCESS:
            return {
                ...state,
                users: state.users,
                posts: state.posts,
                comments: action.fetchedDataComments,
                loading: false,
                showFullPost: true,
            }
        case actionTypes.DELETE_POST:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;