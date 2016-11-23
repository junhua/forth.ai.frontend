import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { JWT_TOKEN } from '../containers/Account/constants';
import * as actionCreators from '../containers/Account/actions';
import { readCookie, checkTokenExpiry } from '../utils';

const scope = ['github', 'facebook'];

class OAuthLogin extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  componentWillMount() {
    const oAuth = this.props.params.OAuth.toLowerCase();

    if (scope.indexOf(oAuth) > -1) {
      const jwt = readCookie('jwt');
      if (jwt) {
        localStorage.setItem(JWT_TOKEN, jwt);
        if (checkTokenExpiry()) {
          this.props.actions.loginSuccess(jwt);
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
