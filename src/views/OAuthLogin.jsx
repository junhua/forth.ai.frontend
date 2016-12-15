import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../containers/Auth/actions';
import { readCookie, checkTokenExpiry, setJWTToStorage } from '../utils';

const scope = ['github', 'facebook', 'google'];

class OAuthLogin extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  componentWillMount() {
    const oAuth = this.props.params.OAuth.toLowerCase();

    if (scope.indexOf(oAuth) > -1) {
      const jwt = readCookie('jwt');
      if (jwt) {
        setJWTToStorage(jwt);
        if (checkTokenExpiry()) {
          this.props.actions.loginUserSuccess(jwt);
          this.context.router.replace('/home/');
        }
      } else {
        this.context.router.replace('/login?redirect=/');
      }
    } else {
      this.context.router.replace('/login?redirect=/');
    }
  }

  // componentWillReceiveProps() {}

  render() {
    return (
      <div className="sr-only">hello world</div>
    );
  }
}

// OAuthLogin.contentTypes = {
//   router: React.
// }

OAuthLogin.propTypes = {
  params: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(false, mapDispatchToProps)(OAuthLogin);
