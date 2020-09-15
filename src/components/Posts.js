import React, { Component } from 'react';
import Card from './Card';


class Posts extends Component {

  render() {
    return this.props.posts.map((post) => (
      <Card key={post._id} post={post} />
    ));
  }
}

export default Posts;
