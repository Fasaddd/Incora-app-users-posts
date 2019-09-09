import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Toolbar.module.css';


const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ul className={classes.Navigate}>
                <li className={classes.Link}><NavLink activeClassName={classes.active} to='/users'>Users</NavLink></li>
                <li className={classes.Link}><NavLink activeClassName={classes.active} to='/posts'>Posts</NavLink></li>
                <li className={classes.Link}><NavLink activeClassName={classes.active} to='/newpost'>New Post</NavLink></li>
                {props.show ? <li className={classes.Link}><NavLink activeClassName={classes.active} to='/comments'>Full Post</NavLink></li> : null}
            </ul>
            <div>Logo</div>
        </header>
    );
};

const mapStateToProps = state => {
  return {
    show: state.showFullPost
  }
}

export default connect(mapStateToProps)(toolbar);