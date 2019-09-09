import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios-orders';

import Post from '../../components/Post/Post';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from '../Container.module.css';
import classesData from '../NewPost/NewPost.module.css';

class Posts extends Component {

    state = {
        editData: {}
    };

    // depend on search we request certain answer(all posts or exactly users' posts )
    componentDidMount() {
        let searchPath = this.props.location.search || '';
        this.props.onInitUsers();
        this.props.onInitPosts(searchPath);
    }
    // depend on id of post, it shows comments on the page FullPost
    redirectOnComment = (postId) => {
        this.props.history.push('/comments?postId=' + postId);
    };

    // deleting certain post
    onClickDeleteHandler = (postId) => {
        postId = +postId;
        this.props.onDeletePost(postId);
    };

    // Editing posts
    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value);
        let data = {
            ...this.state.editData,
            [name]: value
        };
        this.setState({
            editData: data
        });
    };

    // sending rquest for editing Post
    clickEditHandler = () => {
        let data = {
            ...this.state.editData
        };
        let postId = data.postId;
        console.log(data);
        axios.put(`/posts/` + postId, data)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {
        let outputData = <Spinner />;
        if (!this.props.loading) {
            if (this.props.error !== null) {
                outputData = <p>Some Error</p>;
            } else {
                outputData = this.props.postsInf.map(element => {
                    return <Post key={element.id}
                        postInf={element}
                        disabledButt={false}
                        clickDelete={() => this.onClickDeleteHandler(element.id)}
                        clickNext={() => this.redirectOnComment(element.id)} />
                });
            };
        };

        return (
            <div className={classes.Content}>
                <h3>Posts</h3>
                <div className={classesData.NewPost}>
                    <div className={classesData.Input}>
                        <label className={classesData.Label}>postId</label>
                        <input onChange={this.handleInputChange} className={classesData.InputElement} name='postId' min="0" type='number' />
                        <label className={classesData.Label}>Title</label>
                        <input onChange={this.handleInputChange} className={classesData.InputElement} name='title' type='text' />
                        <label className={classesData.Label}>Body</label>
                        <input onChange={this.handleInputChange} className={classesData.InputElement} name='body' type='text' />
                        <Button btnType='Put' clicked={this.clickEditHandler}>Edit</Button>
                    </div>
                </div>

                <ul>
                    {outputData}
                </ul>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        postsInf: state.posts,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPosts: (searchPath) => dispatch(actions.initPosts(searchPath)),
        onInitUsers: () => dispatch(actions.initUsers()),
        onDeletePost: (id) => dispatch(actions.deletePost(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));