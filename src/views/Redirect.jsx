import React, { Component } from 'react';

class Redirect extends Component {

  componentWillMount() {
    if (window) {
      window.location = 'https://www.facebook.com/forthai';
    }
  }

  render() {
    return (
      <div>
        <h1>Redirect...</h1>
      </div>
    );
  }
}

export default Redirect;
