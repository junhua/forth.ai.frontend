import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NotificationStack } from 'react-notification';
import * as actionCreators from './actions';
import { deletePost } from '../Post/actions';
import { getJWTFromStorage } from '../../utils';
import './Toast.scss';

function isArray(arg) { return Object.prototype.toString.call(arg) === '[object Array]'; }
// function isObject(arg) { return Object.prototype.toString.call(arg) === '[object Object]'; }

function getBarStyle(barStyle) {
  const defaultBarStyle = {
    left: '50%',
    bottom: 'auto',
    opacity: 0.8,
    WebkitTransform: 'translate3d(-50%, 0, 0)',
    MozTransform: 'translate3d(-50%, 0, 0)',
    msTransform: 'translate3d(-50%, 0, 0)',
    OTransform: 'translate3d(-50%, 0, 0)',
    transform: 'translate3d(-50%, 0, 0)',
    background: '#337ab7',
    fontSize: '1.25rem',
    zIndex: 99999,
  };

  return Object.assign({}, defaultBarStyle, barStyle);
}

function getBgColor(level) {
  const bgColors = {
    info: '#5bc0de',
    succ: '#449d44',
    warning: '#f0ad4e',
    error: '#d9534f',
  };

  return bgColors[level];
}

function getActionStyle() {
  return Object.assign({}, {
    fontSize: '1rem',
    color: '#222831' });
}


function barStyleFactory(index, style) {
  return Object.assign({}, style, {
    top: `${6 + (index * 4)}rem`,
  });
}

class Toast extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.transformNotifications = this.transformNotifications.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  transformNotifications() {
    const { notifications, dismissFns } = this.props;
    return notifications.map((notification) => {
      const barStyle = getBarStyle({ backgroundColor: getBgColor(notification.level) });
      const actionStyle = getActionStyle();

      const mergeNotification = Object.assign({}, notification, {
        dismissAfter: 2000,
        barStyle,
        actionStyle,
      });

      if (notification.action) {
        mergeNotification.action = notification.action;
        mergeNotification.onClick = () => this.removeNotification(notification);
      }

      if (notification.dismissFn) {
        let args = [];
        if (isArray(notification.args)) {
          args = notification.args;
        }

        mergeNotification.onDismiss = () => dismissFns[notification.dismissFn](...args);
      }

      return mergeNotification;
    });
  }

  handleDismiss(notification) {
    if (notification.onDismiss && typeof notification.onDismiss === 'function') {
      notification.onDismiss();
    }

    this.removeNotification(notification);
  }

  removeNotification(notification) {
    this.props.actions.removeNotification(notification.key);
  }

  render() {
    return (
      <NotificationStack
        notifications={this.transformNotifications()}
        onDismiss={this.handleDismiss}
        barStyleFactory={barStyleFactory}
        activeBarStyleFactory={barStyleFactory}
      />
    );
  }
}

Toast.propTypes = {
  notifications: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  dismissFns: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
  dismissFns: {
    deletePost: (id) => {
      dispatch(deletePost(id, getJWTFromStorage()));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
