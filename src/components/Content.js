import React, { Component } from 'react';
import Posts from './Posts';

class Content extends Component {
  render() {
    return (
      <div className="blog-content">
        <Posts posts={this.props.posts} />
      </div>
    );
  }
}

export default Content;

