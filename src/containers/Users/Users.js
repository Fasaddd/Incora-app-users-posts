import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import User from '../../components/User/User';
import classes from '../Container.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Users extends Component {
    // sending request for Users
    componentDidMount() {
        this.props.onInitUsers();
    };

    // redirect on User's posts
    redirectOnPost = (userId) => {
        this.props.history.push('/posts?userId=' + userId);
    };

    render() {
        let updatedUsers = <Spinner />;

        if (!this.props.loading) {
            updatedUsers = this.props.users.map(element => {
                return <User key={element.id}
                    userInf={element}
                    clicked={() => this.redirectOnPost(element.id)}
                />
            });
        };
        if (this.props.error !== null) {
            updatedUsers = <p>Some Error</p>;
        } else {
            updatedUsers = this.props.users.map(element => {
                return <User key={element.id}
                    userInf={element}
                    click={() => this.redirectOnPost(element.id)}
                />
            });
        };

        return (
            <div className={classes.Content}>
                <h3>Users</h3>
                <ul>
                    {updatedUsers}
                </ul>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        users: state.users,
        error: state.error,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: () => dispatch(actions.initUsers())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));