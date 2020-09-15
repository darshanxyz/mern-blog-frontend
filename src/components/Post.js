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

  render() {
    return (
      <div className="post-page">
        <h2 className="post-title">{this.state.post.title}</h2>
        <p className="post-author">Written by {this.state.post.author} on {new Date(this.state.post.createdAt).getDate() +
          '-' + new Date(this.state.post.createdAt).getMonth() + '-' + new Date(this.state.post.createdAt).getFullYear()}</p>
        <div className="post-image" style={{ backgroundImage: `url("${this.state.post.imageLink}")` }}></div>
        <p className="post-description">{this.state.post.description}</p>
        <div className="action-btns">
          <button className="cta-button" onClick={this.editPost}>Edit Post</button>
          {/* <a href="/" className="cta-button" >Home</a> */}
        </div>
      </div>
    );
  }
}

export default Post;
