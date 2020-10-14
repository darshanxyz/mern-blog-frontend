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
    const post = this.props.posts.filter(post => post._id === params.postId)[0];
    this.setState({
      posts: this.props.posts,
      post: post
    });
    const pageView = post.pageViews + 1
    const postToPatch = {
      'pageViews': pageView
    }
    axios.patch(`http://localhost:4000/${params.postId}`, postToPatch);
    this.postId = params.postId;
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

  handleCommentChange = event => {
    var post = { ...this.state.post };
    console.log(post);
    post.comment = event.target.value;
    this.setState({ post: post });
  }

  handleCommentAdd = (event) => {
    event.preventDefault();
    const comment = {
      user: this.state.post.author,
      commentedAt: Date.now(),
      comment: this.state.post.comment
    }
    const { match: { params } } = this.props;
    axios.patch(`http://localhost:4000/comment/${params.postId}`, comment)
      .then(res => {
        const post = { ...this.state.post };
        post.comments.push(comment);
        this.setState({ post });
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
        <p className="post-description">
          {this.state.post.description}
        </p>
        <img className="post-image" alt={this.state.post.title} src={this.state.post.imageLink}></img>
        {
          this.state.posts.length > 0
            ?
            this.state.post.content.map((content, index) => (
              content.contentType === 'paragraph'
                ?
                <p key={index} className="post-paragraph">
                  {content.content}
                </p>
                :
                <h3 key={index} className="post-subheading">
                  {content.content}
                </h3>
            ))
            :
            null
        }
        <div className="post-interactions">
          <h3 className="post-likes">
            <FaHeart onClick={this.handleLikes} color={this.getHeartColor()} />
            <p>{this.state.post.likes}</p>
            <FaComments color="#4190c8" />
            <p>45</p>
          </h3>
        </div>
        <div className="edit-post comments">
          <h2>Comments</h2>
          <form onSubmit={this.handleCommentAdd}>
            <input type="text" name="title" placeholder="Add a comment" onChange={this.handleCommentChange} />
            <button className="cta-mains" type="submit">Post</button>
          </form>
          <div className="all-comments">
            {(this.state.post.comments) ? this.state.post.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <p className="comment-user">{comment.user}</p>
                <p className="comment-time">{comment.commentedAt}</p>
                <p className="comment-text">{comment.comment}</p>
              </div>
            )) : null}
          </div>
        </div>
        <h2>More on <span style={{ color: '#FF596C' }}>dblogr</span></h2>
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
