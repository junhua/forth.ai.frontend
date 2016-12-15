import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../Account/actions';
import { getJWTFromStorage } from '../../utils';

import './SideBar.scss';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedAccount = this.handleSelectedAccount.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchAccounts(getJWTFromStorage());
  }

  handleSelectedAccount(account) {
    const { selectedAccount, actions: { setSelectedAccount } } = this.props;
    return () => {
      if (selectedAccount !== account) {
        setSelectedAccount(account);
      }
    };
  }

  render() {
    const { accounts, selectedAccount } = this.props;
    const accountList = accounts.map(account => (
      <li role="presentation" className={`profile${account === selectedAccount ? ' active' : ''}`} key={account.uid}>
        <a className="account" onClick={this.handleSelectedAccount(account)}>
          <div className="profile-avatar">
            <img src={account.avatar} alt="avatar" />
            <i className="fa fa-facebook profile-avatar-icon" aria-hidden="true" />
          </div>
          <div className="detail">
            <span className="username">{account.name}</span>
            <span className="text-capitalize service">{account.provider}</span>
          </div>
          <span className="count">10</span>
        </a>
      </li>
      )
    );

    return (
      <nav className="g-sidebar" style={{ minHeight: '300px' }}>
        <div className="m-sidebar-container">
          <ul className="nav m-nav-stacked">
            {accountList}
          </ul>
        </div>
      </nav>
    );
  }
}

SideBar.propTypes = {
  accounts: PropTypes.array.isRequired,
  selectedAccount: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  accounts: state.account.accounts,
  selectedAccount: state.account.selected,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
