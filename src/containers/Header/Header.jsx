import React from 'react';
import { Link } from 'react-router';
import './Header.scss';

function Header({ isAuthenticated, logout }) {
  return (
    <div className="header">
      <nav className="navbar navbar-default navbarMb0">
        <div className="container clearfix maxWidth pt-6">
          <div className="nav-header navbar-left pull-left logo">
            <h2>forth.ai</h2>
          </div>
          <div className="navbar-right pull-right navigator">
            { isAuthenticated ?
              <ul className="nav nav-pills">
                <li role="presentation"><a href="#Profile">Profile</a></li>
                <li role="presentation"><a href="#Logout" onClick={logout}>Logout</a></li>
              </ul>
              :
              <ul className="nav nav-pills">
                <li role="presentation"><Link to="/login?redirect=/">Login</Link></li>
              </ul>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default Header;
