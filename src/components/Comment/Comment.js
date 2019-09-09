import React, { Component } from 'react';

import Aux from '../../hoc/Auxillilary/Auxillilary';
import classes from '../Component.module.css';

class FullPost extends Component {

    render() {
        const comment = this.props.commentInf;
        return (
            <Aux>
                <li className={classes.Component}>
                    <span>Name: {comment.name}</span>
                    <span>Body: {comment.body}</span>
                    <span>Email: {comment.email}</span>
                </li>
            </Aux>
        );
    };
};



export default FullPost;