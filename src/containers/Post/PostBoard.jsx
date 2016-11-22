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
    this.toggleCreate = this.toggleCreate.bind(this);
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

  toggleCreate(e) {
    e.stopPropagation();
    this.setState({ creating: !this.state.creating });
  }

  handleCreatePost(post) {
    this.props.actions.createPost(2, [], [], post.content);
  }

  handleUpdatePost(post) {
    return (newPost) => {
      const mergePost = Object.assign({}, post, newPost);
      this.props.actions.updatePost(mergePost);
    };
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
          {...this.props}
          post={post} key={post.id}
          handleUpdatePost={this.handleUpdatePost(post)}
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
          <PostItemBtn onToggle={this.toggleCreate} />
        }
      </div>
    );
  }
}

PostBoard.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  posts: React.PropTypes.array.isRequired,
  // pending: React.PropTypes.bool.isRequired,
  // success: React.PropTypes.bool.isRequired,
  // failure: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  posts: state.posts.allPost,
  pending: state.posts.isFetching,
  success: !state.posts.isFetching && !state.posts.error,
  failure: !state.posts.isFetching && !!state.posts.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
