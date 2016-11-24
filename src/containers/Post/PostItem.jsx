import React, { Component } from 'react';
import PostItemEdit from './PostItemEdit';
import StackIcon from '../../components/StackIcon';
import { stopPropagation } from '../../utils';

class PostItem extends Component {

  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  state = {
    editing: false,
  }

  componentWillReceiveProps(nextProps) {
    const { editId, post } = nextProps;
    this.setState({ editing: editId === post.id });
  }

  toggleEdit(e) {
    stopPropagation(e);
    const { editing } = this.state;
    const { post } = this.props;

    // console.warn(editing, post.content);
    if (editing) {
      this.props.toggleEditId(null);
    } else {
      this.props.toggleEditId(post.id);
    }

    this.setState({ editing: !editing });
  }

  render() {
    // const { editing } = this.state;
    const { editId, post, handleUpdatePost, handleDeletePost } = this.props;
    return (
      <div className="mb-1_5em post-item">
        <div className="title">
          <div className="row">
            <div className="col-xs-6">
              <h4>
                <span className="modified-time">{post.date_created}</span>&nbsp;&nbsp;
                <a href="#edit"><i className="fa fa-pencil" aria-hidden="true" /><span className="sr-only">edit</span></a>
              </h4>
            </div>
            <div className="col-xs-6">
              <div className="text-right">
                <a className="add-account" href="#add_account">
                  <i className="fa fa-plus-square-o fa-3x vertical-top" aria-hidden="true" />
                  <span className="sr-only">add account</span>
                </a>
                <StackIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="post-body">
          <div className="media">
            <div className="media-body">
              {/* <h4 className="media-heading">Media heading</h4> */ }
              <a href="#anchor">
                <i className="fa fa-arrows fa-2x arrows" aria-hidden="true" />
                <span className="sr-only">anchor</span>
              </a>
              <a href="#anchor">
                <i className="fa fa-comment fa-2x comment" aria-hidden="true" />
                <span className="sr-only">anchor</span>
              </a>
              { editId !== post.id ?
                <p>{post.content}</p>
                :
                <PostItemEdit
                  initialValues={{ content: post.content }}
                  onSubmit={handleUpdatePost}
                />
              }
            </div>
            <div className="media-left text-right">
              <img className="media-obejct" src="/assets/images/wiki_global.png" alt="..." />
              <div className="text-right toolkit">
                <a className="" href="#done"><i className="fa fa-check-circle-o fa-2x done" aria-hidden="true" /><span className="sr-only">done</span></a>
                <a className="" href="#remove" onClick={handleDeletePost}><i className="fa fa-times-circle-o fa-2x remove" aria-hidden="true" /><span className="sr-only">remove</span></a>
                <a className="" href="#draft" onClick={this.toggleEdit}><i className="fa fa-edit fa-2x draft" aria-hidden="true" /><span className="sr-only">edit</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  editId: React.PropTypes.oneOfType([
    React.PropTypes.number.isRequired,
    React.PropTypes.object.isRequired,
  ]),
  post: React.PropTypes.object.isRequired,
  handleUpdatePost: React.PropTypes.func.isRequired,
  handleDeletePost: React.PropTypes.func.isRequired,
  toggleEditId: React.PropTypes.func.isRequired,
};

export default PostItem;
