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
  }

  componentDidMount() {
    this.props.actions.fetchPosts();
  }

  handleCreatePost(content) {
    this.props.actions.createPost(2, [], [], content);
  }

  render() {
    const { posts, isFetching } = this.props;

    const postList = !isFetching && posts.map(
      post => (<PostItem {...post} dateCreated={post.date_created} key={post.id} />)
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
        <PostItemNew onSubmit={this.handleCreatePost} />
        <PostItemBtn />
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
