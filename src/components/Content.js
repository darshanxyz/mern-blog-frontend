import React, { Component } from 'react';
import Posts from './Posts';
import { FaSearch } from 'react-icons/fa';

class Content extends Component {
  render() {
    return (
      <div className="main-content">
        <form className="search-form" action="/managePosts">
          <div className="input-container">
            <input type="text" placeholder="Search Posts" name="search" />
            <button className="search-btn" type="submit"><FaSearch color="#FF596C" /></button>
          </div>
        </form>
        <div className="blog-content">
          <Posts posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

export default Content;

