import React from 'react';
import './form.scss';

function AccoutForm() {
  return (
    <div className="form-wrapper">
      <form className="form-account">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Account Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <div className="container-fulid clearfix">
            <label htmlFor="password">Password</label>
            <a className="pull-right forgotBtn">Forgot Password?</a>
          </div>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="checkbox">
          <label htmlFor="rememberMe">
            <input type="checkbox" id="rememberMe" className="mt-3Ex" /> Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-default center-block loginBtn">LOGIN</button>
      </form>
    </div>
  );
}

export default AccoutForm;
