import React, { Component } from 'react';
import { FaComment, FaEdit, FaHeart, FaPen, FaRegEye, FaTrash } from 'react-icons/fa';
import metricIllustration from '../assets/metrics.svg'
import axios from 'axios';
import Plot from 'react-plotly.js';

class ManagePosts extends Component {

  constructor(props) {
    super();
    this.state = {
      posts: props.posts,
      user: props.user,
      metrics: props.metrics
    }
  }

  editPost = id => event => {
    event.preventDefault();
    window.location = id + `/edit`;
  }

  deletePost = id => event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      const post = {
        id: id
      }
      axios.delete(`http://localhost:4000/${id}`, post)
        .then(res => {
          var posts = [...this.state.posts];
          posts = posts.filter((p) => p._id !== id);
          this.setState({ posts });
        })
    }
  }

  lineChart = (props) => (
    <Plot
      data={[
        {
          x: props.x,
          y: props.y,
          type: 'scatter',
          mode: 'lines+markers',
          fill: 'tozeroy',
          marker: {
            color: '#FF596C'
          },
        },
      ]}
      layout={{
        title: props.title,
        autosize: 'true',
        xaxis: {
          title: 'Months',
          showgrid: false,
        },
        yaxis: {
          title: 'Views',
          showgrid: false,
        }
      }}
      style={{
        width: "100%",
        height: "100%"
      }}
      useResizeHandler={true}
    />
  )

  barChart = (props) => (
    <Plot
      data={[
        {
          x: props.x,
          y: props.y1,
          type: 'bar',
          name: 'Likes',
          fill: 'tozeroy',
          marker: {
            color: '#FF596C'
          },
        },
        {
          x: props.x,
          y: props.y2,
          type: 'bar',
          name: 'Comments',
          fill: 'tozeroy',
          marker: {
            color: '#fda6b0'
          },
        }
      ]}
      layout={{
        title: props.title,
        autosize: 'true',
        barmode: 'stack',
        xaxis: {
          title: 'Months',
          showgrid: false,
        },
        yaxis: {
          title: 'Interactions',
          showgrid: false,
        }
      }}
      style={{
        width: "100%", height: "100%"
      }}
      useResizeHandler={true}
    />
  )

  render() {
    return (
      <div className="container manage-post-page">
        <div className="post-card metric-card">
          <div className="card-body">
            <img src={metricIllustration} alt="metricIllustration"></img>
            <div className="metric-text">
              <h1>Manage Posts</h1>
              <h3>One place to control and manage all your posts with ease</h3>
            </div>
          </div>
        </div>
        <h2>Posts Metrics</h2>
        <div id="post-metrics" className="post-metrics">
          <div className="post-metric">
            <div className="metric-header">
              <FaPen color="#FF596C" /> <h4>Posts</h4>
            </div>
            <div className="metric-number">
              <h2>{this.state.metrics.totalPosts}</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaRegEye color="#FF596C" /><h4>Page Views</h4>
            </div>
            <div className="metric-number">
              <h2>{this.state.metrics.totalPageViews}</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaHeart color="#FF596C" /> <h4>Likes</h4>
            </div>
            <div className="metric-number">
              <h2>{this.state.metrics.totalLikes}</h2>
            </div>
          </div>
          <div className="post-metric">
            <div className="metric-header">
              <FaComment color="#FF596C" /> <h4>Comments</h4>
            </div>
            <div className="metric-number">
              <h2>{this.state.metrics.totalComments}</h2>
            </div>
          </div>
        </div>
        <div className="chart">
          <this.lineChart
            title="Page views per month"
            x={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']}
            y={[2, 6, 3, 10, 15, 12, 18, 16, 20, 12]} />
          <this.barChart
            title="Social interactions per month"
            x={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']}
            y1={[2, 6, 3, 20, 11, 7, 18, 12, 15, 12]}
            y2={[1, 3, 6, 12, 5, 3, 9, 12, 12, 10]} />
        </div>
        <h2 style={{ marginTop: '20px' }}>Posts</h2>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.filter(post => post.author === this.state.user.firstName).map((post) => (
              <tr key={post._id}>
                <td>
                  <p className="post-title">{post.title}</p>
                </td>
                <td>
                  <h5 className="post-date">
                    {new Date(post.createdAt).getDate()
                      + ' ' + new Date(post.createdAt).toLocaleString('default', { month: 'long' })
                      + ', ' + new Date(post.createdAt).getFullYear()}
                  </h5>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="cta-button" style={{ backgroundColor: '#FFF' }} onClick={this.editPost(post._id)}><FaEdit color="#FF596C" /></button>
                    <button className="cta-button" style={{ backgroundColor: '#FFF' }} onClick={this.deletePost(post._id)}><FaTrash color="#FF596C" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManagePosts;
