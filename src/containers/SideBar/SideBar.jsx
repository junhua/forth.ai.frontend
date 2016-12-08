import React from 'react';
import './SideBar.scss';

function SideBar() {
  return (
    <nav className="g-sidebar">
      <div className="m-sidebar-container">
        <ul className="nav m-nav-stacked">
          <li role="presentation" className="profile active">
            <a className="account">
              <div className="profile-avatar">
                <img src="/images/wiki_global.png" alt="avatar" />
                <i className="fa fa-facebook profile-avatar-icon" aria-hidden="true" />
              </div>
              <div className="detail">
                <span className="username">ipland</span>
                <span className="service">Facebook</span>
              </div>
            </a>
          </li>
          <li role="presentation" className="profile">
            <a>
              <div className="profile-avatar">
                <div className="img" />
                <i className="fa fa-facebook profile-avatar-icon" aria-hidden="true" />
              </div>
              <div className="detail">
                <span className="username">ipland</span>
                <span className="service">Facebook</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
