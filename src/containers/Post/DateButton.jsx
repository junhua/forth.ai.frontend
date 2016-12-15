import React, { Component } from 'react';

// DateButton must be class
class DateButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button
        className="button date-button"
        onClick={this.handleClick}
      >
        <span>{this.props.value}</span>
      </button>
    );
  }
}

DateButton.propTypes = {
  onClick: React.PropTypes.func,
  value: React.PropTypes.string,
};

export default DateButton;
