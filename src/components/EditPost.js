import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {

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
        this.setState(post);
      });
  }

  handleEdit = event => {
    event.preventDefault();
    const post = {
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      author: this.state.author
    }
    const { match: { params } } = this.props;
    axios.patch(`http://localhost:4000/${params.postId}`, post)
      .then(res => {
        window.location = `http://localhost:3000/${params.postId}`
      })
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  }

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  }

  handleAuthorChange = event => {
    this.setState({ author: event.target.value });
  }

  render() {
    return (
      <div className="edit-post">
        <form onSubmit={this.handleEdit}>
          <h3>Edit Post</h3>
          <label>Title</label>
          <input type="text" name="title" onChange={this.handleTitleChange} value={this.state.title || ''} />
          <label>Category</label>
          <input type="text" name="category" onChange={this.handleCategoryChange} value={this.state.category || ''} />
          <label>Description</label>
          <textarea rows="10" cols="50" name="description" onChange={this.handleDescriptionChange} value={this.state.description || ''} />
          <label>Author</label>
          <input type="text" name="author" onChange={this.handleAuthorChange} value={this.state.author || ''} />
          <button type="submit">Edit Post</button>
        </form>
      </div>
    );
  }
}

export default EditPost;
