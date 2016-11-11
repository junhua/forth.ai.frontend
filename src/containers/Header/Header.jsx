import React from 'react';
import { Link } from 'react-router';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-default navbarMb0">
        <div className="container clearfix maxWidth pt-6">
          <div className="nav-header navbar-left pull-left logo">
            <h2>forth.ai</h2>
          </div>
          <div className="navbar-right pull-right navigator">
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
