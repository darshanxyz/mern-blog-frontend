import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

class ManagePosts extends Component {

  constructor(props) {
    super();
    this.state = {
      posts: props.posts,
      user: props.user
    }
  }

  editPost = id => event => {
    event.preventDefault();
    window.location = id + `/edit`;
  }

  deletePost = id => event => {
    event.preventDefault();
    const post = {
      id: id
    }
    axios.delete(`http://localhost:4000/${id}`, post)
      .then(res => {
        window.location = "/managePosts"
      })
  }

  render() {
    return (
      <div className="manage-post-page">
        <h2>Manage Posts</h2>
        {this.state.posts.filter(post => post.author === this.state.user.firstName).map((post) => (
          <div className="post-detail" key={post._id}>
            <div>
              <h3 className="post-title">{post.title}</h3>
              <h5 className="post-date">{new Date(post.createdAt).getDate() +
                ' ' + new Date(post.createdAt).toLocaleString('default', { month: 'long' }) + ', ' + new Date(post.createdAt).getFullYear()}</h5>
            </div>
            <div className="action-btns">
              <button className="cta-button" style={{ backgroundColor: '#4190c8' }} onClick={this.editPost(post._id)}><FaEdit color="#FFF" /></button>
              <button className="cta-button" style={{ backgroundColor: '#FF596C' }} onClick={this.deletePost(post._id)}><FaTrash color="#FFF" /></button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ManagePosts;
