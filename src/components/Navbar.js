import React, { Component } from 'react';
import GoogleButton from './GoogleButton';
import { FaFan } from 'react-icons/fa'

class Navbar extends Component {

  render() {
    return (
      <nav className="nav">
        <h1 className="logo"><a href="/"><FaFan color="#FF596C" /> dblogr</a></h1>
        <ul className="menu">
          <li><a href="/">All Posts</a></li>
          {
            !this.props.user.isLoggedIn
              ?
              <li><GoogleButton user={this.props.user} getUser={this.props.getUser} /></li>
              :
              <li>
                <input type="radio" name="menuopt" id="drop1" />
                <label className="opener" htmlFor="drop1">Hi, {this.props.user.firstName}</label>
                <label className="closer" htmlFor="dropclose">Hi, {this.props.user.firstName}</label>
                <ul className="nav-sub-menu">
                  <li><a href="/addPost">Add Post</a></li>
                  <li><a href="/managePosts">Manage Posts</a></li>
                  <li><GoogleButton user={this.props.user} getUser={this.props.getUser} /></li>
                </ul>
                <input type="radio" name="menuopt" id="dropclose" />
              </li>
          }
        </ul>
      </nav>
    );
  }
}

export default Navbar;
