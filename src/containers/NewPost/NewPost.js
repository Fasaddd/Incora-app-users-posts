import React, { Component } from 'react';
import axios from '../../axios-orders';

import classes from './NewPost.module.css';
import Button from '../../components/UI/Button/Button';

class NewPost extends Component {

    state = {
        orderForm: {
        },
    };

    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let order = {
            ...this.state.orderForm,
            [name]: value
        };
        this.setState({
            orderForm: order
        });
    };


    clickSendHandler = () => {
        let data = {
            ...this.state.orderForm
        };
        console.log(data);
        axios.post('/posts', data)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className={classes.NewPost}>
                <div className={classes.Input}>
                    <label className={classes.Label}>Title</label>
                    <input onChange={this.handleInputChange} className={classes.InputElement} name='title' type='text' />
                    <label className={classes.Label}>Body</label>
                    <input onChange={this.handleInputChange} className={classes.InputElement} name='body' type='text' />
                    <Button btnType='Success' clicked={this.clickSendHandler}>Send</Button>
                </div>
            </div>

        );
    };
};

export default NewPost;