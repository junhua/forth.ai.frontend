import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import FadeModal from 'boron/FadeModal';
import PostItem from './PostItem';
import PostItemBtn from './PostItemBtn';
import PostEditor from './PostEditor';
import * as actionCreators from './actions';
import { getJWTFromStorage } from '../../utils';
import { addNotification } from '../Toast/actions';
import './Post.scss';

class PostBoard extends Component {

  constructor(props) {
    super(props);

    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.restCreatedAndEditId = this.restCreatedAndEditId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleSharePost = this.handleSharePost.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  state = {
    isCreated: false,
    editId: null,
    selectedPost: null,
    action: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAccount !== this.props.selectedAccount) {
      this.props.actions.fetchPosts(getJWTFromStorage(), `status=0&page_id=${nextProps.selectedAccount.id}`);
    }
  }

  restCreatedAndEditId() {
    this.setState({ isCreated: false, editId: null });
  }

  toggleCreate() {
    this.setState({ isCreated: true, editId: null });
  }

  toggleEditor(postId) {
    return () => {
      this.setState({ isCreated: false, editId: postId });
    };
  }

  handleCreatePost(post) {
    this.props.actions.createPost(
      Object.assign({}, {
        type: 2,
        themes: [],
        keywords: [],
      }, post),
      getJWTFromStorage());
  }

  handleUpdatePost(post) {
    this.props.actions.updatePost(post, getJWTFromStorage());
  }

  handleDeletePost() {
    // this.props.actions.deletePost(id, getJWTFromStorage());
    console.warn(this.state.selectedPost);
    this.props.removePostWithUndo(this.state.selectedPost.id);
    this.toggleModal(null, null);
  }

  handleSharePost() {
    console.warn(this.state.selectedPost);
    this.toggleModal(null, null);
  }

  handleSubmit(values) {
    const { selectedAccount } = this.props;
    const { action } = values;

    delete values.action;

    if (action === 'CREATE_POST') {
      values.pages = [{ id: selectedAccount.id }];
      this.handleCreatePost(values);
    } else if (action === 'PUBLISH_NOW') {
      values.publish_now = true;
      values.pages = [{ id: selectedAccount.id }];
      console.warn('unfinished PUBLISH_NOW', values);
    } else if (action === 'UPDATE_POST') {
      this.handleUpdatePost(values);
    }

    this.restCreatedAndEditId();
  }

  toggleModal(post, action) {
    this.modal.toggle();
    console.warn('toggleModal', typeof action);

    if (typeof action === 'string') {
      this.setState({ selectedPost: post, action });
    } else {
      // hidden Modal, 300ms animation
      setTimeout(this.setState.bind(this, { selectedPost: null, action: null }), 300);
    }
  }

  renderEditor() {
    const { isCreated, editId } = this.state;
    const { posts } = this.props;

    if (isCreated) {
      return (
        <PostEditor
          action="CREATE_POST"
          publishDate={moment().add(3, 'hours')}
          onClose={this.restCreatedAndEditId}
          onSubmit={this.handleSubmit}
        />);
    }

    if (editId !== null) {
      const post = (posts.filter(p => p.id === editId))[0];
      return (
        <PostEditor
          initialValues={post}
          post={post}
          action="UPDATE_POST"
          publishDate={moment(post.publish_date)}
          onClose={this.restCreatedAndEditId}
          onSubmit={this.handleSubmit}
        />);
    }

    return null;
  }

  renderModal() {
    const { action } = this.state;
    let heading = null;
    let confirmButton = null;

    if (action === 'DELETE') {
      heading = (<h3>Do you really want to delete this?</h3>);
      confirmButton = (<button className="pull-right delete-button" onClick={this.handleDeletePost}>Delete</button>);
    } else if (action === 'SHARE') {
      heading = (<h3>Share now?</h3>);
      confirmButton = (<button className="pull-right share-button" onClick={() => { console.warn('unfinished SHARE_NOW'); this.toggleModal(null, null); }}>Share</button>);
    }

    return (
      <FadeModal
        ref={node => (this.modal = node)}
        className="m-fade-modal"
        modalStyle={{ width: '400px' }}
        contentStyle={{ borderRadius: '4px' }}
      >
        <div className="m-fade-modal_inner">
          {heading}
          {/* <p>{selectedPost && selectedPost.content}</p>*/}
          <a className="close-button" onClick={this.toggleModal}>
            <i className="fa fa-times" />
            <span className="sr-only">close</span>
          </a>
          <div className="button-group clearfix">
            <button className="pull-left cancel-button" onClick={this.toggleModal}>Cancel</button>
            {confirmButton}
          </div>
        </div>
      </FadeModal>
    );
  }

  render() {
    const { posts, isFetching } = this.props;

    const postList = posts.map(
      post => (
        <PostItem
          {...this.props}
          post={post} key={post.id}
          toggleEditor={this.toggleEditor}
          toggleModal={this.toggleModal}
          handleDeletePost={this.handleDeletePost}
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
        <PostItemBtn onToggle={this.toggleCreate} />
        {this.renderEditor()}
        {this.renderModal()}
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
  selectedAccount: React.PropTypes.object.isRequired,
  removePostWithUndo: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.post.isFetching,
  posts: state.post.allPost,
  pending: state.post.isFetching,
  success: !state.post.isFetching && !state.post.error,
  failure: !state.post.isFetching && !!state.post.error,
  selectedAccount: state.account.selected,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
  removePostWithUndo: (id) => {
    dispatch(addNotification('Remove Post?', 'warning', 'undo', 'deletePost', [id]));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
