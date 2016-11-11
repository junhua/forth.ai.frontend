import React from 'react';
import './form.scss';

function AccoutForm() {
  return (
    <div className="form-wrapper">
      <div className="form-pane">
        <form className="form-account">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Account Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
          </div>
          <div className="form-group">
            <div className="container-fulid clearfix">
              <label htmlFor="password">Password</label>
              <a className="pull-right btn-forgot">Forgot Password?</a>
            </div>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="checkbox">
            <label htmlFor="rememberMe">
              <input type="checkbox" id="rememberMe" className="mt-3Ex" /> Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-default center-block btn-login">LOGIN</button>
        </form>
        <hr />
        <div>
          <p className="description text-center">or sign in with one of these services</p>
          <div className="bottons text-center">
            <button className="btn btn-default btn-facebook btn-gap">
              <i className="fa fa-facebook-official fa-2x fa-icon facebook-official-color" aria-hidden="true" />
              <span>FACEBOOK</span>
            </button>
            <button className="btn btn-default btn-github btn-gap">
              <i className="fa fa-github fa-2x fa-icon github-color" aria-hidden="true" />
              <span>GITHUB</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AccoutForm;
