import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostItemNew from './PostItemNew';
import PostItemBtn from './PostItemBtn';
import * as actionCreators from './actions';
import './Post.scss';

class PostBoard extends Component {

  constructor(props) {
    super(props);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  state = {
    creating: false,
  }

  componentDidMount() {
    this.props.actions.fetchPosts();
  }

  // shouldComponentUpdate() {
  //   if (this.props.isFetching) {
  //     return false;
  //   }
  //   return true;
  // }

  handleToggle(e) {
    e.stopPropagation();
    this.setState({ creating: !this.state.creating });
  }

  handleCreatePost(content) {
    this.props.actions.createPost(2, [], [], content);
  }

  handleDeletePost(id) {
    return (e) => {
      e.stopPropagation();
      this.props.actions.deletePost(id);
    };
  }

  render() {
    const { creating } = this.state;
    const { posts, isFetching } = this.props;

    const postList = posts.map(
      post => (
        <PostItem
          {...post} dateCreated={post.date_created} key={post.id}
          handleDeletePost={this.handleDeletePost(post.id)}
        />
      )
    );

    return (
      <div className="clearfix posts">
        { isFetching &&
          <div className="loading text-center">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
            <span className="sr-only">Loading...</span>
          </div>
        }
        {postList}
        {creating ?
          <PostItemNew onSubmit={this.handleCreatePost} />
          :
          <PostItemBtn onToggle={this.handleToggle} />
        }
      </div>
    );
  }
}

PostBoard.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  posts: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  posts: state.posts.allPost,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
