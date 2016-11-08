import React from 'react';
import { Link } from 'react-router';
import styles from './style.scss';

function Header() {
  return (
    <div className={styles.header}>
      <nav className={`navbar navbar-default ${styles.navbarMb0}`}>
        <div className={`container clearfix ${styles.maxWidth}`}>
          <div className="nav-header navbar-text navbar-left pull-left logo">
            <h2>forth.ai</h2>
          </div>
          <div className={`navbar-text navbar-right pull-right ${styles.navigator}`}>
            <ul className="nav nav-pills">
              <li role="presentation"><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Header;
