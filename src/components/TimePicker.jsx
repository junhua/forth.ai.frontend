import React, { Component } from 'react';
import moment from 'moment';
import { stopPropagation } from '../utils';

function leftpad(n) {
  return (`00${n}`).slice(-2);
}

class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  state = { open: false }

  handleChange(event) {
    stopPropagation(event);
    const value = this.props.defaultValue;

    const targetValue = event.target.value;

    if (event.target.name === 'hour') {
      value.hour(parseInt(targetValue, 10));
    }

    if (event.target.name === 'minute') {
      value.minute(parseInt(targetValue, 10));
    }

    this.props.onChange(value);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { defaultValue } = this.props;
    const value = defaultValue || moment();

    const hourOptions = [];
    for (let i = 0; i < 24; i += 1) {
      hourOptions.push(<option value={i} key={`hour-${i}`}>{leftpad(i)}</option>);
    }
    const minuteOptions = [];
    for (let i = 0; i < 60; i += 1) {
      minuteOptions.push(<option value={i} key={`minute-${i}`}>{leftpad(i)}</option>);
    }
    return (
      <div className="time-picker-panel">
        <div className="time-picker-panel-inner">
          <button className="button time-button" onClick={this.toggleOpen}>
            <span>{value.format('hh:mm A')}</span>
          </button>
          { this.state.open &&
            <div className="time-picker-panel-select">
              <select name="hour" defaultValue={value.hour()} onChange={this.handleChange}>
                {hourOptions}
              </select>
              <select name="minute" defaultValue={value.minute()} onChange={this.handleChange}>
                {minuteOptions}
              </select>
              <button className="button time-set-button" onClick={this.toggleOpen} disabled={value.isBefore(moment())}>Set</button>
            </div>}
        </div>
      </div>
    );
  }
}

TimePicker.propTypes = {
  defaultValue: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default TimePicker;
