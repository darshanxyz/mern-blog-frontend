import React, { Component } from 'react';
import GoogleButton from './GoogleButton';

class Navbar extends Component {

  render() {
    return (
      <nav className="nav">
        <h1 className="logo"><a href="/">Poem<span style={{ 'fontWeight': '300' }}>Blog</span></a></h1>
        <ul>
          <li><a href="/">All Posts</a></li>
          <li><a href="/addPost">Add Post</a></li>
          <li><GoogleButton getUser={this.props.getUser} /></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
