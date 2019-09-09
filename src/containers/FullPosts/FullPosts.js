import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Comment from '../../components/Comment/Comment';
import User from '../../components/User/User';
import Post from '../../components/Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../Container.module.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxillilary/Auxillilary';



class FullPosts extends Component {
    // checking and sending a request for comments
    componentDidMount() {
        let searchPath = this.props.location.search || '';
        if (searchPath.length === 0) {
            this.props.history.push('/');
        } else {
            this.props.onInitComments(searchPath);
        }
    };
    // delete posts
    onClickDeleteHandler = (postId) => {
        postId = +postId;
        this.props.onDeletePost(postId);
    };

    onClickPutHandler = (postId) => {
        postId = +postId;
    }


    render() {
        let output = (
            <div>
                <Link to='/users'>To see full information choose user!</Link>
                <Spinner />
            </div>
        );
        // Output of FullPost if everything is OK
        if (!this.props.loading && this.props.commentsInf.length !== 0) {
            let user = this.props.usersInf.filter(element => {
                return element.id === Math.ceil(this.props.commentsInf[0].postId / 10);
            }).map(el => {
                console.log(el);
                return <User key={el.id}
                            disabledButt={true}    
                            userInf={el} />
            });

            let posts = this.props.postsInf
                .filter(element => {
                    return element.id === this.props.commentsInf[0].postId;
                })
                .map(el => {
                    return <Post key={el.id}
                        postInf={el}
                        disabledButt={true}
                        clickDelete={() => this.onClickDeleteHandler(el.id)} />
                });
            let comments = this.props.commentsInf.map(element => {
                return <Comment key={element.id} commentInf={element} />
            });

            output = (
                <Aux>
                    <div className={classes.Content}>
                        <h2>Full post information</h2>
                        <h3>User Information</h3>
                        <ul>
                            {user}
                        </ul>
                    </div>
                    <hr />
                    <div className={classes.Content}>
                        <h3>User's post</h3>
                        <ul>
                            {posts}
                        </ul>
                    </div>
                    <hr />
                    <div className={classes.Content}>
                        <h3>Post's comments</h3>
                        <ul>
                            {comments}
                        </ul>
                    </div>
                </Aux>
            );
        }

        return output;
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        commentsInf: state.comments,
        error: state.error,
        postsInf: state.posts,
        usersInf: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitComments: (searchPath) => dispatch(actions.initComments(searchPath)),
        onDeletePost: (id) => dispatch(actions.deletePost(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPosts));