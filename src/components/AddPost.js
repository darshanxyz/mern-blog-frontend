import React, { Component } from 'react';
import axios from 'axios';

class AddPost extends Component {

  constructor(props) {
    super();
  }

  state = {
    title: '',
    category: '',
    description: 'helo',
    author: '',
    content: []
  }

  handleSubmit = event => {
    event.preventDefault();
    const post = {
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      author: this.props.user.firstName,
      content: this.state.content
    }
    axios.post('http://localhost:4000', post)
      .then(res => {
        console.log(res);
        window.location = "/" + res.data._id
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

  handleAddParagraph = event => {
    event.preventDefault();
    this.setState((prevState) => ({
      content: [...prevState.content, { 'contentType': 'paragraph', 'content': '' }]
    }));
  }

  handleRemoveParagraph = (event, index) => {
    event.preventDefault();
    const content = this.state.content;
    content.splice(index, 1);
    this.setState({
      content: content
    })
  }

  handleContentChange = (event, index) => {
    event.preventDefault();
    const { name, value } = event.target;
    const content = this.state.content;
    content[index][name] = value;
    this.setState({
      content: content
    })
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
          {/* <label>Description</label>
          <textarea rows="10" cols="50" name="description" onChange={this.handleDescriptionChange} /> */}
          {this.state.content.map((item, index) => (
            <div key={index}>
              <textarea rows="10" cols="50" name="content" value={item.content} onChange={event => this.handleContentChange(event, index)} />
              <button className="" onClick={event => this.handleRemoveParagraph(event, index)}>Remove</button>
            </div>
          ))}
          <button onClick={this.handleAddParagraph} type="submit">Add Paragraph</button>
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default AddPost;
