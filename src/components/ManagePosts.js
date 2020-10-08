import React, { Component } from 'react';
import { FaComment, FaEdit, FaHeart, FaPen, FaRegEye, FaTrash } from 'react-icons/fa';
import metricIllustration from '../assets/metrics.svg'
import axios from 'axios';
// import Plot from 'react-plotly.js';

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
    if (window.confirm("Are you sure you want to delete?")) {
      const post = {
        id: id
      }
      axios.delete(`http://localhost:4000/${id}`, post)
        .then(res => {
          window.location = "/managePosts"
        })
    }
  }

  render() {
    return (
      <div className="container manage-post-page">
        <div className="post-card metric-card">
          <div className="card-body">
            <img src={metricIllustration} alt="metricIllustration"></img>
            <div className="metric-text">
              <h1>Manage Posts</h1>
              <h3>Control all your posts with ease at a single location</h3>
            </div>

          </div>
        </div>
        <h2>Posts Metrics</h2>
        <div className="post-metrics">
          <div className="post-metric">
            <div className="metric-header">
              <FaPen color="#FF596C" /> <h4>Posts</h4>
            </div>
            <div className="metric-number">
              <h2>15</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaRegEye color="#FF596C" /><h4>Page Views</h4>
            </div>
            <div className="metric-number">
              <h2>2.2K</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaHeart color="#FF596C" /> <h4>Likes</h4>
            </div>
            <div className="metric-number">
              <h2>750</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaComment color="#FF596C" /> <h4>Comments</h4>
            </div>
            <div className="metric-number">
              <h2>540</h2>
            </div>
          </div>
        </div>
        <h2>Posts</h2>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.filter(post => post.author === this.state.user.firstName).map((post) => (
              <tr key={post._id}>
                <td>
                  <p className="post-title">{post.title}</p>
                </td>
                <td>
                  <h5 className="post-date">
                    {new Date(post.createdAt).getDate()
                      + ' ' + new Date(post.createdAt).toLocaleString('default', { month: 'long' })
                      + ', ' + new Date(post.createdAt).getFullYear()}
                  </h5>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="cta-button" style={{ backgroundColor: '#FFF' }} onClick={this.editPost(post._id)}><FaEdit color="#4190c8" /></button>
                    <button className="cta-button" style={{ backgroundColor: '#FFF' }} onClick={this.deletePost(post._id)}><FaTrash color="#FF596C" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManagePosts;
