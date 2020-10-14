import React, { Component } from 'react';
import Posts from './Posts';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

class Content extends Component {

  state = {
    posts: this.props.posts
  }

  loadPosts = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (value && value.length > 5) {
      axios.get(`http://localhost:4000/search/${value}`)
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
          console.log(posts);
        });
    }
    if (!value) {
      axios.get(`http://localhost:4000/`)
        .then(res => {
          const posts = res.data;
          this.setState({ posts });
          console.log(posts);
        });
    }
  }

  render() {
    return (
      <div className="main-content">
        <form className="search-form">
          <div className="input-container">
            <input type="text" placeholder="Search Posts" name="search" onChange={this.loadPosts} />
            <button className="search-btn" type="submit" onClick={this.loadPosts}><FaSearch color="#FF596C" /></button>
          </div>
        </form>
        <h2>Recent Posts</h2>
        <div className="blog-content">
          <Posts posts={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default Content;

