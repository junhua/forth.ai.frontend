import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostItemNew from './PostItemNew';
import PostItemBtn from './PostItemBtn';
import * as actionCreators from './actions';
import './Post.scss';

class PostBoard extends Component {

  componentDidMount() {
    this.props.actions.fetchPosts();
  }

  render() {
    const { posts, isFetching } = this.props;

    const postList = posts.map(
      post => (<PostItem {...post} dateCreated={post.date_created} key={post.date_created} />)
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
        <PostItemNew />
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
