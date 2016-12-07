import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../containers/Account/actions';
import RegistrationForm from '../containers/Forms/RegistrationForm';
import { ROOT_URL } from '../utils';

function RegistrationView(props) {
  const { isSubmitting } = props;

  return (
    <div className="form-wrapper">
      <ul className="nav nav-tabs m-nav-justified">
        <li role="presentation" className="m-cornor-l"><a href="/login">SIGN IN</a></li>
        <li role="presentation" className="m-cornor-r active"><a href="javascript:void(0);">SIGN UP</a></li>
      </ul>
      <div className="form-pane">
        <RegistrationForm onSubmit={props.registerUser} isSubmitting={isSubmitting} />
        <hr />
        <div>
          <p className="description text-center">or sign in with one of these services</p>
          <div className="bottons text-center">
            <a className="btn btn-default btn-facebook" href={`${ROOT_URL}/accounts/facebook/login/`}>
              <i className="fa fa-facebook-official fa-2x fa-icon facebook-official-color" aria-hidden="true" />
              <span>FACEBOOK</span>
            </a>
            <a className="btn btn-default btn-github" href={`${ROOT_URL}/accounts/github/login/`}>
              <i className="fa fa-github fa-2x fa-icon github-color" aria-hidden="true" />
              <span>GITHUB</span>
            </a>
            <a className="btn btn-default btn-google" href={`${ROOT_URL}/accounts/google/login/`}>
              <i className="fa fa-google fa-2x fa-icon google-color" aria-hidden="true" />
              <span>GOOGLE</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

RegistrationView.propTypes = {
  isSubmitting: React.PropTypes.bool.isRequired,
  registerUser: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSubmitting: state.auth.isAuthenticating,
});

const mapDispatchToProps = dispatch => ({
  registerUser: (fields) => {
    dispatch(registerUser(fields));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationView);
