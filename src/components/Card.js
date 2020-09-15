import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component {

  state = {
    id: '',
  }

  deletePost = event => {
    event.preventDefault();
    const post = {
      id: this.state.id
    }
    console.log(post);
    axios.delete(`http://localhost:4000/${this.state.id}`, post)
      .then(res => {
        window.location = "/"
      })
  }

  readPost = event => {
    window.location = `/${this.props.post._id}`;
  }

  editPost = event => {
    window.location = `/${this.props.post._id}/edit`;
  }

  componentDidMount() {
    this.setState({
      id: this.props.post._id,
      imageLink: this.props.post.imageLink
    });
  }

  render() {
    return (
      <div className="post-card">
        <div className="card-body" style={{ backgroundImage: `url("${this.state.imageLink}")` }}>
          {/* <p>{this.props.post.description.length > 300 ? this.props.post.description.slice(0, 300) + ' ...' : this.props.post.description}</p> */}
        </div>
        <div className="card-header">
          <h3 className="post-title">{this.props.post.title}</h3>
          <h5 className="post-category">{this.props.post.category}</h5>
        </div>
        <div className="card-footer">
          <button onClick={this.deletePost}>Delete</button>
          <button onClick={this.editPost}>Edit</button>
          <button style={{ backgroundColor: '#4190c8', color: '#FFF' }} onClick={this.readPost}>Read</button>
        </div>
      </div>
    );
  }
}

export default Card;

