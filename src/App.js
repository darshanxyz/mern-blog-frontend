import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Post from './components/Post';
import ManagePosts from './components/ManagePosts';

class App extends Component {
  state = {
    posts: [],
    user: {
      isLoggedIn: false,
      accessToken: '',
      firstName: '',
      email: ''
    },
    metrics: {}
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  getUser = (user) => {
    this.setState({ user: user });
    axios.post(`http://localhost:4000/metrics`, { 'user': this.state.user })
      .then(res => {
        const metrics = res.data;
        this.setState({ metrics });
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} getUser={this.getUser} />
          <Route exact path="/" render={props => (
            <React.Fragment>
              {this.state.posts.length > 0 ? <Content posts={this.state.posts} /> : null}
            </React.Fragment>
          )} />
          <Switch>
            <Route path="/addPost" render={
              props => (
                <React.Fragment>
                  <AddPost user={this.state.user} />
                </React.Fragment>
              )
            } />
            <Route path="/managePosts" render={
              props => (
                <React.Fragment>
                  {(this.state.posts.length > 0) && (this.state.user.accessToken.length > 0) && (this.state.metrics.totalPosts)
                    ? <ManagePosts posts={this.state.posts} metrics={this.state.metrics} user={this.state.user} /> : null}
                </React.Fragment>
              )
            } />
            <Route path="/:postId/edit" render={props => (
              <EditPost user={this.state.user} {...props} />
            )} />
            <Route path="/:postId" render={props => (
              <React.Fragment>
                {this.state.posts.length > 0 ? <Post posts={this.state.posts} {...props} /> : null}
              </React.Fragment>
            )} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
