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

class App extends Component {
  state = {
    posts: [],
    user: [{
      isLoggedIn: false,
      accessToken: '',
      firstName: '',
      email: ''
    }]
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      });
  }

  getUser = (user) => {
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} getUser={this.getUser} />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Content posts={this.state.posts} />
            </React.Fragment>
          )} />
          <Switch>
            <Route path="/addPost" component={AddPost} />
            <Route path="/:postId/edit" component={EditPost} />
            <Route path="/:postId" component={Post} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
