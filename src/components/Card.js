import React, { Component } from 'react';
import { FaHeart, FaComments } from 'react-icons/fa';
class Card extends Component {

  state = {
    id: '',
  }

  readPost = event => {
    window.location = `/${this.props.post._id}`;
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
          <div className="overlay" onClick={this.readPost}>
            <div className="card-header">
              <h5 className="post-category">{this.props.post.category}</h5>
              <h3 className="post-title">{this.props.post.title}</h3>
            </div>
            <div className="card-footer">
              <h5 className="post-author">{this.props.post.author}</h5>
              <div className="post-interactions">
                <h5 className="post-likes">
                  <FaHeart color="#FF596C" />
                  <p>{this.props.post.likes}</p>
                  <FaComments color="#4190c8" />
                  <p>{this.props.post.comments.length}</p>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

