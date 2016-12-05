import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostItemNew from './PostItemNew';
import PostItemBtn from './PostItemBtn';
import * as actionCreators from './actions';
import './Post.scss';
import { stopPropagation, getJWTFromStorage } from '../../utils';
import { addNotification } from '../Toast/actions';

class PostBoard extends Component {

  constructor(props) {
    super(props);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleEditId = this.toggleEditId.bind(this);
    this.restState = this.restState.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  state = {
    creating: false,
    editId: null,
  }

  componentWillMount() {
    this.props.actions.fetchPosts(getJWTFromStorage());
  }

  // shouldComponentUpdate() {
  //   if (this.props.isFetching) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidMount() {
    document.addEventListener('click', this.restState, false);
  }

  componentWillReceiveProps(nextProps) {
    const { success } = nextProps;
    if (success) {
      this.restState();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.restState, false);
  }

  setCreate(creating) {
    this.setState({ creating });
  }

  setEditId(postId) {
    this.setState({ editId: postId });
  }

  restState() {
    this.setCreate(false);
    this.setEditId(null);
  }

  toggleCreate(e) {
    stopPropagation(e);
    this.setCreate(true);
    this.setEditId(null);
  }

  toggleEditId(postId) {
    this.setCreate(false);
    this.setEditId(postId);
  }

  handleCreatePost(post) {
    const mergePost = Object.assign({}, {
      type: 2,
      themes: [],
      keywords: [],
    }, post);

    this.props.actions.createPost(mergePost, getJWTFromStorage());
  }

  handleUpdatePost(post) {
    return (newPost) => {
      const mergePost = Object.assign({}, post, newPost);
      this.props.actions.updatePost(mergePost, getJWTFromStorage());
    };
  }

  handleDeletePost(id) {
    return (e) => {
      e.stopPropagation();
      // this.props.actions.deletePost(id, getJWTFromStorage());
      this.props.removePostWithUndo(id);
    };
  }

  render() {
    const { creating, editId } = this.state;
    const { posts, isFetching } = this.props;

    const postList = posts.map(
      post => (
        <PostItem
          {...this.props}
          post={post} key={post.id} editId={editId}
          toggleEditId={this.toggleEditId}
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
  removePostWithUndo: React.PropTypes.func.isRequired,
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
  removePostWithUndo: (id) => {
    dispatch(addNotification('Remove Post?', 'warning', 'undo', 'deletePost', [id]));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
