import React, { Component } from 'react';
import axios from 'axios';

class AddPost extends Component {

  constructor(props) {
    super();
  }

  state = {
    title: '',
    category: '',
    description: '',
    author: ''
  }

  handleSubmit = event => {
    event.preventDefault();
    const post = {
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      author: this.state.author,
    }
    console.log('data', post);
    axios.post('http://localhost:4000', post)
      .then(res => {
        window.location = "/"
      });
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
    this.setState({ author: this.props.user.firstName });
  }

  render() {
    return (
      <div className="add-post">
        <form onSubmit={this.handleSubmit}>
          <h3>Add Post</h3>
          <label>Title</label>
          <input type="text" name="title" onChange={this.handleTitleChange} />
          <label>Category</label>
          <input type="text" name="category" onChange={this.handleCategoryChange} />
          <label>Description</label>
          <textarea rows="10" cols="50" name="description" onChange={this.handleDescriptionChange} />
          <label>Author</label>
          <input type="text" name="author" onChange={this.handleAuthorChange} value={this.props.user.firstName} />
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default AddPost;
