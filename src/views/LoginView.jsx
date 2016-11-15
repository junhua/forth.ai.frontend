import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../containers/Account/actions';

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

  handleChange(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    console.log('redirectRoute', this.state.redirectTo);
    console.log('redirectRoute', this.props.location);
    this.props.actions.loginUser(
      this.email.value.toLowerCase(),
      this.state.password,
      this.state.redirectTo);
  }

  render() {
    const { password } = this.state;
    return (
      <div className="form-wrapper">
        <div className="form-pane">
          <form className="form-account">
            <div className="form-group">
              <label htmlFor="email">Account Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={node => (this.email = node)}
                placeholder="Email"
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
            <button
              type="submit"
              className="btn btn-default center-block btn-login"
              onClick={this.login}
            >LOGIN</button>
          </form>
          <hr />
          <div>
            <p className="description text-center">or sign in with one of these services</p>
            <div className="bottons text-center">
              <a className="btn btn-default btn-facebook btn-gap" href="#facebook_login">
                <i className="fa fa-facebook-official fa-2x fa-icon facebook-official-color" aria-hidden="true" />
                <span>FACEBOOK</span>
              </a>
              <a className="btn btn-default btn-github btn-gap" href="#github_login">
                <i className="fa fa-github fa-2x fa-icon github-color" aria-hidden="true" />
                <span>GITHUB</span>
              </a>
            </div>

          </div>
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
};


const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
