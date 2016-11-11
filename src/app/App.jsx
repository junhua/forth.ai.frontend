import React, { Component } from 'react';

import Header from '../containers/Header/Header';
import '../shard.scss';

class App extends Component {
  render() {
    return (
      <div className="container-fuild pt-50">
        <Header />
        <div className="main-site">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
