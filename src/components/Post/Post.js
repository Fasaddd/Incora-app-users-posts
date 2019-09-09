import React, { Component } from 'react';

import Aux from '../../hoc/Auxillilary/Auxillilary';
import Button from '../UI/Button/Button';
import classes from '../Component.module.css';

class Post extends Component {


    render() {
        const postInf = this.props.postInf;
        return (
            <Aux>
                <li className={classes.Component}>
                    <h3>User ID: {postInf.userId}</h3>
                    <h4>Post Num: {postInf.id}</h4>
                    <span>Title: {postInf.title}</span>
                    <span>Body: {postInf.body}</span>
                    <br/>
                    <Button btnType='Danger' clicked={this.props.clickDelete}>Delete</Button>
                    <Button btnType='Success' disabled={this.props.disabledButt} clicked={this.props.clickNext}>Posts' comments</Button>
                </li>
            </Aux>
        );
    };
};



export default Post;