import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateButton from './DateButton';
import TimePicker from '../../components/TimePicker';

function renderTextarea({ input, name, placeholder, onChange }) {
  const onChangeOrigin = input.onChange;

  input.onChange = (event) => {
    onChangeOrigin(event);
    onChange(event);
  };

  return (
    <textarea
      {...input}
      className="form-control composer"
      id={name}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

renderTextarea.propTypes = {
  input: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.toggleTimePicker = this.toggleTimePicker.bind(this);
    this.handleTextAreaHeight = this.handleTextAreaHeight.bind(this);
  }

  state = {
    publishDate: null,
    datePickerOpening: false,
    timePickerOpening: false,
    willHidden: false,
    hidden: true,
  }

  handleTextAreaHeight(event) {
    const elm = event.target;
    const hlElm = this.hlElm;

    hlElm.textContent = elm.value;
    let height = hlElm.scrollHeight;

    if (height <= 150) {
      height = 150;
    } else if (height <= 250) {
      height += 18;
    }

    if (height >= 250) {
      height = 250;
    }

    elm.style.height = `${height}px`;
  }

  handleDateChange(date) {
    if (this.state.publishDate === null) {
      this.setState({ publishDate: this.props.publishDate });
    }

    this.setState({ publishDate: date });
  }

  toggleDatePicker() {
    console.warn(this.state.datePickerOpening);
    this.setState({ datePickerOpening: !this.state.datePickerOpening });
  }

  toggleTimePicker() {
    console.warn(this.state.timePickerOpening);
    this.setState({ timePickerOpening: !this.state.timePickerOpening });
  }

  render() {
    const { pristine, submitting, handleSubmit, onClose, publishDate, action } = this.props;

    return (
      <div className="post-editor">
        <div className="post-editor-inner">
          <form className="post-editor-form" onSubmit={e => e.preventDefault()}>
            <a className="modal-close" onClick={onClose}>
              <i className="fa fa-times" aria-hidden="true" />
              <span className="sr-only">close</span>
            </a>
            <div className="only-draft">
              <div className="composer-wrapper">
                <div className="backdrop">
                  <div className="highlights" ref={node => (this.hlElm = node)}>somthing</div>
                </div>
                <div className="composer-textarea-wrapper">
                  <Field name="content" component={renderTextarea} placeholder='"What do you want to share?"' onChange={this.handleTextAreaHeight} />
                </div>
              </div>
            </div>

            <div className="overlay-actions clearfix">
              <div className="overlay-actions-left">
                <DatePicker
                  customInput={<DateButton />}
                  className="date-picker"
                  dateFormat="MMM D, Y"
                  minDate={moment()}
                  highlightDates={[moment()]}
                  selected={this.state.publishDate || publishDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  onChange={this.handleDateChange}
                  defaultValue={this.state.publishDate || publishDate}
                />
              </div>
              <div className="overlay-actions-right">
                { action === 'CREATE_POST' &&
                  <button
                    className="button share-now-button"
                    disabled={pristine || submitting}
                    onClick={
                      handleSubmit((values) => {
                        this.props.onSubmit(Object.assign({}, values, {
                          action: 'PUBLISH_NOW',
                          publish_date: moment().toJSON(),
                          // publish_now: true,
                        }));
                      })
                    }
                  >PUBLISH NOW</button>}
                <button
                  className="button post-button"
                  disabled={action === 'CREATE_POST' ? (pristine || submitting) : false}
                  onClick={
                    handleSubmit((values) => {
                      this.props.onSubmit(Object.assign({}, values, {
                        action,
                        publish_date: (this.state.publishDate || publishDate).toJSON(),
                        // pages: [{ id: 1 }],
                      }));
                    })
                  }
                >{action === 'CREATE_POST' ? 'ADD QUEUE' : 'SAVE'}</button>
              </div>
            </div>
          </form>
        </div>
        <div className="u-widget-overlay u-front" onClick={onClose} />
      </div>
    );
  }
}

PostEditor.propTypes = {
  handleSubmit: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  publishDate: React.PropTypes.object,
  action: React.PropTypes.string,
  // content: React.PropTypes.string,
  onClose: React.PropTypes.func,
};

export default reduxForm({
  form: 'postEditorForm',
  // vaildate,
  // destroyOnUnmount: false,
  // enableReinitialize: true,
})(PostEditor);
