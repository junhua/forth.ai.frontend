import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../containers/Auth/actions';
import { validateEmail } from '../utils';
import OAuthLinkList from '../components/OAuthLinkList';

class LoginView extends Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.redirect || '/';
    this.state = {
      password: '',
      redirectTo: redirectRoute,
    };

    this.handleChangePassword = this.handleChange.bind(this, 'password');
    this.login = this.login.bind(this);
  }

  handleChange(prop, event) {
    this.setState({ [prop]: event.target.value });
  }

  login(event) {
    event.preventDefault();
    const emailStr = this.email.value.toLowerCase().trim();
    const password = this.state.password;
    if (!validateEmail(emailStr)) {
      this.email.focus();
    } else if (password.length < 6) {
      this.setState({ password: '' });
      this.password.focus();
    } else {
      this.props.actions.loginUser(
        emailStr,
        password,
        this.state.redirectTo);
    }
  }

  render() {
    const { password } = this.state;
    const { submitting } = this.props;
    return (
      <div className="form-wrapper">
        <ul className="nav nav-tabs m-nav-justified">
          <li role="presentation" className="m-cornor-l active"><a href="javascript:void(0);" style={{ background: '#eeeeee', marginRight: '0px' }}>SIGN IN</a></li>
          {false && <li role="presentation" className="m-cornor-r"><a href="/signup">SIGN UP</a></li>}
        </ul>
        <div className="form-pane">
          <form className="account-form sr-only" onSubmit={this.login}>
            <fieldset disabled={submitting}>
              <div className="form-group">
                <label htmlFor="email">Account Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  ref={node => (this.email = node)}
                  placeholder="Email"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <div className="container-fulid clearfix">
                  <label htmlFor="password">Password</label>
                  <a className="pull-right btn-forgot">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  ref={node => (this.password = node)}
                  onChange={this.handleChangePassword}
                  placeholder="Password"
                />
              </div>
              <div className="checkbox">
                <label htmlFor="rememberMe">
                  <input type="checkbox" id="rememberMe" className="mt-3Ex" /> Remember Me
                </label>
              </div>
              { !submitting ?
                <button
                  type="submit"
                  className="btn btn-default center-block btn-login"
                  disabled
                >SIGN IN</button>
                :
                <button
                  type="submit"
                  className="btn btn-default center-block btn-login"
                  disabled={submitting}
                >
                  <i className="fa fa-spinner fa-spin fa-lg fa-fw" />
                  <span className="sr-only">Loading...</span>
                </button>
              }
            </fieldset>
          </form>
          {/* <hr />*/}
          <OAuthLinkList />
        </div>
      </div>
    );
  }
}

LoginView.contextTypes = {
  router: React.PropTypes.object,
};

LoginView.propTypes = {
  location: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  submitting: state.auth.isAuthenticating,
  statusText: state.auth.statusText,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
