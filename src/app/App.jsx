import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NotificationStack } from 'react-notification';
import { logoutAndRedirect } from '../containers/Account/actions';
import Header from '../containers/Header/Header';
import Toast from '../containers/Toast/Toast';
import '../shard.scss';
import '../../assets/images/wiki_global.png';

class App extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <div className="container-fuild pt-50">
        <Header {...props} />
        <div className="main-container">
          {children}
        </div>
        <Toast />
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAndRedirect()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
