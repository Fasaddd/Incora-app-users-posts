import React, { Component } from 'react';

import Aux from '../../hoc/Auxillilary/Auxillilary';
import Button from '../UI/Button/Button';
import classes from '../Component.module.css';

class User extends Component {


    render() {
        const user = {
            ...this.props.userInf,                   
        };
        return (
            <Aux>
                <li className={classes.Component}>
                    <h3>User Num: {user.id}</h3>
                    <span>Name: {user.name}</span>
                    <span>Username: {user.username}</span>
                    <span>Website: {user.website}</span>
                    <span>Phone: {user.phone}</span>
                    <span>Email: {user.email}</span>
                    <hr />
                    <p>Company:</p>
                    <span>Company Name: {user.company.name}</span>
                    <span>CatchPhrase: {user.company.catchPhrase}</span>
                    <span>Bs: {user.company.bs}</span>
                    <hr />
                    <p>Addres: </p>
                    <span>City: {user.address.city}</span>
                    <span>Street: {user.address.street}</span>
                    <span>Suit: {user.address.suit}</span>
                    <span>ZipCode: {user.address.zipcode}</span>
                    <span>Geo: lat: {user.address.geo.lat}, lng:{user.address.geo.lng}</span>
                    <br/>
                    <Button clicked={this.props.click} disabled={this.props.disabledButt} btnType='Success'>Users' posts</Button>
                </li>
            </Aux>
        );
    };
};



export default User;