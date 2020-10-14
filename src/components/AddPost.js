import React, { Component } from 'react';
import { FaHeading, FaParagraph, FaTrash } from 'react-icons/fa';
import axios from 'axios';

class AddPost extends Component {

  constructor(props) {
    super();
  }

  state = {
    title: '',
    category: '',
    description: '',
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
    console.log(post);
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

  handleAddSubheading = event => {
    event.preventDefault();
    this.setState((prevState) => ({
      content: [...prevState.content, { 'contentType': 'subheading', 'content': '' }]
    }));
  }

  handleAddParagraph = event => {
    event.preventDefault();
    this.setState((prevState) => ({
      content: [...prevState.content, { 'contentType': 'paragraph', 'content': '' }]
    }));
  }

  handleRemoveField = (event, index) => {
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
      <div className="add-post container">
        <form onSubmit={this.handleSubmit}>
          <h2>Add Post</h2>
          <label>Title<span style={{ color: '#FF596C' }}> *</span></label>
          <input type="text" name="title" onChange={this.handleTitleChange} />
          <label>Category<span style={{ color: '#FF596C' }}> *</span></label>
          <input type="text" name="category" onChange={this.handleCategoryChange} />
          <label>Description<span style={{ color: '#FF596C' }}> *</span></label>
          <textarea className="description-box" rows="10" cols="50" name="description" onChange={this.handleDescriptionChange} />
          {this.state.content.map((item, index) => (
            <div className="section-content" key={index}>
              <label>{item.contentType}</label>
              <textarea rows="10" cols="50" name="content" value={item.content} onChange={event => this.handleContentChange(event, index)} />
              <div className="section-btns">
                <button className="section-btn" style={{ backgroundColor: '#FF596C' }} onClick={event => this.handleRemoveField(event, index)}>
                  <FaTrash color="#FFF" />
                </button>
              </div>
            </div>
          ))}
          <div className="section-btns">
            <button className="section-btn" style={{ backgroundColor: '#4190c8' }} onClick={this.handleAddSubheading}>
              <FaHeading color="#FFF" />
            </button>
            <button className="section-btn" style={{ backgroundColor: '#4190c8' }} onClick={this.handleAddParagraph}>
              <FaParagraph color="#FFF" />
            </button>
          </div>
          <button className="cta-mains" type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default AddPost;
