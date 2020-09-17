import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {

  constructor(props) {
    super();
  }

  state = {
    post: {}
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`http://localhost:4000/${params.postId}`)
      .then(res => {
        const post = res.data;
        this.setState({ post });
        console.log(this.state);
      });
  }

  editPost = event => {
    window.location = `/${this.state.post._id}/edit`;
  }

  deletePost = event => {
    event.preventDefault();
    const post = {
      id: this.state.post._id
    }
    console.log(post);
    axios.delete(`http://localhost:4000/${post.id}`, post)
      .then(res => {
        window.location = "/"
      })
  }

  render() {
    return (
      <div className="post-page">
        <div className="post-header">
          <div style={{ margin: '10px 0' }}>
            <h5 className="post-category">{this.state.post.category}</h5>
            <h2 className="post-title">{this.state.post.title}</h2>
          </div>
          <h5 className="post-author">{this.state.post.author}</h5>
          <h5 className="post-date">{new Date(this.state.post.createdAt).getDate() +
            ' ' + new Date(this.state.post.createdAt).toLocaleString('default', { month: 'long' }) + ', ' + new Date(this.state.post.createdAt).getFullYear()}</h5>
        </div>
        <img className="post-image" alt={this.state.post.title} src={this.state.post.imageLink}></img>
        <p className="post-description">{this.state.post.description}</p>
        <div className="action-btns">
          <button className="cta-button" style={{ backgroundColor: '#4190c8' }} onClick={this.editPost}>Edit</button>
          <button className="cta-button" style={{ backgroundColor: '#FF596C' }} onClick={this.deletePost}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Post;
