import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const showUsersSuccess = (data) => {
    return {
        type: actionTypes.SHOW_USERS_SUCCESS,
        fetchedDataUsers: data
    };
};

export const showPostsSuccess = (data) => {
    return {
        type: actionTypes.SHOW_POSTS_SUCCESS,
        fetchedDataPosts: data
    };
};

export const showCommentsSuccess = (data) => {
    return {
        type: actionTypes.SHOW_COMMENTS_SUCCESS,
        fetchedDataComments: data
    }
}

export const showFailed = (err) => {
    return {
        type: actionTypes.SHOW_FAILED,
        error: err
    };
};

export const showStart = () => {
    return {
        type: actionTypes.SHOW_START,
    }
};


// User's request
export const initUsers = () => {
    return dispatch => {
        dispatch(showStart());
        axios.get('/users')
            .then(response => {
                const fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                    });
                };
                dispatch(showUsersSuccess(fetchedData));
            })
            .catch(error => {
                console.log(error);
                dispatch(showFailed(error));
            });
    };
};

// request for Posts
export const initPosts = (searchPath) => {
    return dispatch => {
        dispatch(showStart());
        axios.get('/posts' + searchPath)
            .then(response => {
                console.log('InitPosts');
                const fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                    });
                };
                dispatch(showPostsSuccess(fetchedData));
            })
            .catch(error => {
                dispatch(showFailed());
            });
    };
};

// Comment's request
export const initComments = (searchPath) => {
    return dispatch => {
        dispatch(showStart());
        axios.get('/comments' + searchPath)
            .then(response => {
                let fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                    });
                };
                dispatch(showCommentsSuccess(fetchedData));
            })
            .catch(error => {
                dispatch(showFailed());
            });
    };
};

export const deletePost = (postId) => {
    console.log('/posts/' + postId);
    return dispatch => {
        dispatch(showStart());
        axios.delete('/posts/' + postId)
            .then(response => {
                console.log(response, 'Deleted information');
                dispatch(initUsers());
            })
            .catch(err => {
                console.log(err);
            })
    };
};