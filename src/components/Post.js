import React, { Component } from 'react';
import axios from 'axios';
import { FaHeart, FaComments } from 'react-icons/fa';
import Card from './Card';

class Post extends Component {

  postliked = ''

  state = {
    posts: [],
    post: {}
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.postId = params.postId;
    this.setState({
      posts: this.props.posts,
      post: this.props.posts.filter(post => post._id === params.postId)[0]
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
    axios.delete(`http://localhost:4000/${post.id}`, post)
      .then(res => {
        window.location = "/"
      })
  }

  handleLikes = () => {
    const { match: { params } } = this.props;
    const postliked = localStorage.getItem(params.postId);
    postliked === 'true' ? localStorage.setItem(params.postId, 'false') : localStorage.setItem(params.postId, 'true');
    const newLikesCount = postliked === 'true' ? this.state.post.likes - 1 : this.state.post.likes + 1;
    const postToPatch = this.state.post;
    postToPatch.likes = newLikesCount;
    axios.patch(`http://localhost:4000/${params.postId}`, postToPatch)
      .then(res => {
        this.setState((prevState) => ({
          post: postToPatch
        }));
      });
  }

  getHeartColor = () => {
    const { match: { params } } = this.props;
    if (localStorage.getItem(params.postId) === 'true') {
      return '#FF596C'
    }
    else {
      return '#EAEAEA'
    }
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
        <div className="post-interactions">
          <h3 className="post-likes">
            <FaHeart onClick={this.handleLikes} color={this.getHeartColor()} />
            <p>{this.state.post.likes}</p>
            <FaComments color="#4190c8" />
            <p>45</p>
          </h3>
        </div>
        {/* <div className="action-btns">
          <button className="cta-button" style={{ backgroundColor: '#4190c8' }} onClick={this.editPost}>Edit</button>
          <button className="cta-button" style={{ backgroundColor: '#FF596C' }} onClick={this.deletePost}>Delete</button>
        </div> */}
        <h2>More on <span style={{ color: '#FF596C' }}>PoemBlog</span></h2>
        <div className="more-posts">
          {this.props.posts.filter(post => post._id !== this.postId).map((post, index) => (
            (index < 3) ? <Card key={post._id} post={post} /> : null
          ))}
        </div>
      </div >
    );
  }
}

export default Post;
