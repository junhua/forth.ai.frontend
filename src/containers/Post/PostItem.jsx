import React from 'react';
import moment from 'moment';
import { linkify } from '../../utils';

function innerHTML(text) {
  return { __html: linkify(text) };
}

function PostItem(props) {
  const { post, toggleEditor, toggleModal } = props;
  return (
    <div className="post-item">
      <div className="update">
        <a href="javascript:void(0)">
          <i className="fa fa-comment fa-2x arrows" aria-hidden="true" style={{ color: '#CED7DF' }} />
          <span className="sr-only">anchor</span>
        </a>
        <div className="update-content">
          <div className="content">
            <p className="message" dangerouslySetInnerHTML={innerHTML(post.content)} onClick={toggleEditor(post.id)} />
            <div className="meta">
              <p className="detail">{moment(post.publish_date).format('MMM D, YYYY hh:mm A')}</p>
              <ul className="actions">
                <li>
                  <a onClick={() => toggleModal(post, 'SHARE_NOW')}>
                    <i className="fa fa-share u-icon" aria-hidden="true" />
                    <span>&nbsp;&nbsp;</span>
                    <span className="action">SHARE NOW</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => toggleModal(post, 'DELETE')}>
                    <i className="fa fa-times u-icon" aria-hidden="true" />
                    <span>&nbsp;&nbsp;</span>
                    <span className="action">delete</span>
                  </a>
                </li>
                <li>
                  <a onClick={toggleEditor(post.id)}>
                    <i className="fa fa-pencil u-icon" aria-hidden="true" />
                    <span>&nbsp;&nbsp;</span>
                    <span className="action">edit</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PostItem.propTypes = {
  post: React.PropTypes.object.isRequired,
  toggleEditor: React.PropTypes.func.isRequired,
  toggleModal: React.PropTypes.func.isRequired,
};

export default PostItem;
