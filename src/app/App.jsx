import React, { Component } from 'react';

import Header from '../containers/Header/Header';
import styles from '../main.scss';

class App extends Component {
  render() {
    return (
      <div className="container-fuild">
        <Header />
        <div className={`${styles.mainSite}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
