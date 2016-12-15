import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../containers/Auth/actions';
import RegistrationForm from '../containers/Forms/RegistrationForm';
import OAuthLinkList from '../components/OAuthLinkList';

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
        <OAuthLinkList />
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
