import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { emailExist } from '../Auth/actions';
import { addNotification } from '../Toast/actions';
import { validateEmail } from '../../utils';

const asyncValidate = (values, dispatch) => (
  new Promise((resolve, reject) => {
    dispatch(emailExist(values.email))
      .then((response) => {
        if (response && response.email && Array.isArray(response.email)
          && response.email.includes('A user is already registered with this e-mail address.')) {
          dispatch(addNotification('The email Address already exists!', 'error', 'close'));
          reject({ email: 'The email Address already exists!' });
        } else {
          resolve();
        }
      });
  })
);

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  } else {
    values.email = values.email.toLowerCase();
  }

  if (!values.password1) {
    errors.password1 = 'Required';
  } else if (values.password1.length < 8) {
    errors.password1 = 'Must be 8 characters or more';
  }

  if (errors.password1) {
    errors.password2 = 'non pass';
  } else {
    if (!values.password2) {
      errors.password2 = 'Required';
    } else if (values.password1 !== values.password2) {
      errors.password2 = 'Password does not match';
    }
  }

  return errors;
};

const checkIcon = (
  <i
    className="fa fa-check-circle" aria-hidden="true"
    style={{ position: 'absolute', left: '100%', top: '50%', margin: '.15rem 0 0 -3rem', color: '#1a8b67', fontSize: '2.2rem' }}
  />
);

const exclamationIcon = (
  <i
    className="fa fa-exclamation-circle" aria-hidden="true"
    style={{ position: 'absolute', left: '100%', top: '50%', margin: '.15rem 0 0 -3rem', color: '#d9534f', fontSize: '2.2rem' }}
  />
);

const loadingIcon = (
  <i
    className="fa fa-spinner fa-spin fa-lg fa-fw"
    style={{ position: 'absolute', left: '100%', top: '50%', margin: '.55rem 0 0 -3rem' }}
  />
);

function renderField({ input, type, name, label, placeholder, meta: { asyncValidating, touched, error } }) {
  let displayIcon = null;

  if (touched && error) {
    displayIcon = exclamationIcon;

    if ((input.name === 'password2' && error === 'non pass')) {
      displayIcon = null;
    }
  }

  if (touched && !error) {
    displayIcon = checkIcon;
  }

  if (asyncValidating) {
    displayIcon = loadingIcon;
  }

  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label htmlFor={name}>{label}</label>
      <input {...input} type={type} className="form-control" id={name} placeholder={placeholder} autoComplete="off" />
      {displayIcon}
    </div>
  );
}

renderField.propTypes = {
  input: React.PropTypes.object.isRequired,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
};

function RegistrationForm(props) {
  const { handleSubmit, pristine, isSubmitting, invalid } = props;

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      {/* <Field name="username" type="text" component={renderField} label="Username" placeholder="name" />*/}
      <Field name="email" type="email" component={renderField} label="Email (required, but never shown)" placeholder="you@example.org" />
      <Field name="password1" type="password" component={renderField} label="Password" placeholder="********" />
      <Field name="password2" type="password" component={renderField} label="Confirm password" placeholder="********" />
      { isSubmitting ?
        <button type="submit" className="btn btn-default center-block btn-signup" disabled>
          <i className="fa fa-spinner fa-spin fa-lg fa-fw" />
          <span className="sr-only">Loading...</span>
        </button>
        :
        <button type="submit" className="btn btn-default center-block btn-signup" disabled={pristine || invalid}>SIGN UP</button>
      }
    </form>
  );
}

RegistrationForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  isSubmitting: React.PropTypes.bool.isRequired,
  invalid: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'registrationForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(RegistrationForm);
