import React from 'react';
import styles from './form.scss';

function AccoutForm() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.account}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Account Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <div className="container-fulid clearfix">
            <label htmlFor="password">Password</label>
            <a className={`pull-right ${styles.forgotBtn}`}>Forgot Password?</a>
          </div>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="checkbox">
          <label htmlFor="rememberMe">
            <input type="checkbox" id="rememberMe" /> Remember Me
          </label>
        </div>
        <button type="submit" className={`btn btn-default center-block ${styles.loginBtn}`}>LOGIN</button>
      </form>
    </div>
  );
}

export default AccoutForm;
