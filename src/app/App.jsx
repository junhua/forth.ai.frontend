import React from 'react';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '../containers/Account/actions';
import Header from '../containers/Header/Header';
import '../shard.scss';

function App({ children, ...props }) {
  return (
    <div className="container-fuild pt-50">
      <Header {...props} />
      <div className="main-site">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAndRedirect()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
