import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import Layout from './containers/Layout/Layout';
import Users from './containers/Users/Users';
import Posts from './containers/Posts/Posts';
import Comments from './containers/FullPosts/FullPosts';
import NewPost from './containers/NewPost/NewPost';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/users' component={Users} />
          <Route path='/posts' component={Posts} />
          <Route path='/comments' component={Comments} />
          <Route path='/newpost' component={NewPost}/>
          <Route path="/" component={() => <Redirect to='/users' />} />
        </Switch>
      </Layout>
    </div>
  );
};



export default App;
