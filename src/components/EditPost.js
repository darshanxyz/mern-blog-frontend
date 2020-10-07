import React, { Component } from 'react';
import { FaHeading, FaParagraph, FaTrash } from 'react-icons/fa';
import axios from 'axios';

class EditPost extends Component {

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
      author: this.props.user.firstName,
      createdAt: Date.now(),
      content: this.state.content
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

  handleAddSection = (event, index, sectionType) => {
    event.preventDefault();
    const content = this.state.content
    content.splice(index + 1, 0, { 'contentType': sectionType, 'content': '' })
    this.setState({
      content: content
    });
  }

  render() {
    return (
      <div className="edit-post container">
        <form onSubmit={this.handleEdit}>
          <h2>Edit Post</h2>
          <label>Title<span style={{ color: '#FF596C' }}> *</span></label>
          <input type="text" name="title" onChange={this.handleTitleChange} value={this.state.title || ''} />
          <label>Category<span style={{ color: '#FF596C' }}> *</span></label>
          <input type="text" name="category" onChange={this.handleCategoryChange} value={this.state.category || ''} />
          <label>Description<span style={{ color: '#FF596C' }}> *</span></label>
          <textarea className="description-box" rows="10" cols="50" name="description" onChange={this.handleDescriptionChange} value={this.state.description || ''} />
          {
            this.state.content
              ?
              this.state.content.map((item, index) => (
                <div className="section-content" key={index}>
                  <label>{item.contentType}</label>
                  <textarea rows="10" cols="50" name="content" value={item.content} onChange={event => this.handleContentChange(event, index)} />
                  <div className="section-btns">
                    <button className="section-btn" style={{ backgroundColor: '#4190c8' }} onClick={event => this.handleAddSection(event, index, 'subheading')}>
                      <FaHeading color="#FFF" />
                    </button>
                    <button className="section-btn" style={{ backgroundColor: '#4190c8' }} onClick={event => this.handleAddSection(event, index, 'paragraph')}>
                      <FaParagraph color="#FFF" />
                    </button>
                    <button className="section-btn" style={{ backgroundColor: '#FF596C' }} onClick={event => this.handleRemoveField(event, index)}>
                      <FaTrash color="#FFF" />
                    </button>
                  </div>
                </div>
              ))
              :
              null
          }
          <button className="cta-mains" type="submit">Edit Post</button>
        </form>
      </div >
    );
  }
}

export default EditPost;
