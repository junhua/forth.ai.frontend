import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { stopPropagation } from '../../utils';

function handleInput(e) {
  const el = e.target;
  const hl = document.querySelector('.highlights');
  hl.textContent = el.value;
  let height = hl.scrollHeight;
  if (height <= 150) {
    height = 150;
  } else if (height <= 250) {
    height += 18;
  }

  if (height >= 250) {
    height = 250;
  }
  el.style.height = `${height}px`;
}

function renderTextarea({ input, name, placeholder }) {
  const onChangeOrigin = input.onChange;

  input.onChange = (e) => {
    onChangeOrigin(e);
    handleInput(e);
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
};

const vaildate = (values) => {
  const errors = {};
  if (!values.content) {
    errors.content = '"What do you want to share?"';
  }

  return errors;
};


function PostItemEdit(props) {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <div className="mb-1_5em post-item-edit" onClick={stopPropagation}>
      <form className="post-form" onSubmit={handleSubmit}>
        {/* <input type="url"className="form-control mb-1_5em" placeholder="URL"
          pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?" /> */ }
        <div className="only-draft">
          <div className="composer-wrapper">
            <div className="backdrop">
              <div className="highlights">somthing</div>
            </div>
            <div className="composer-textarea-wrapper mb-1_5em">
              <Field name="content" component={renderTextarea} placeholder='"What do you want to share?"' />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="uploadPhoto" className="btn btn-default fw-bolder btn-file">UPLOAD PHOTO</label>
              <input type="file" id="uploadPhoto" className="sr-only" />
            </div>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-default pull-right btn-post fw-bolder" disabled={pristine || submitting}>POST</button>
          </div>
        </div>

      </form>
    </div>
  );
}

PostItemEdit.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  // content: React.PropTypes.string,
};

export default reduxForm({
  form: 'postEditForm',
  vaildate,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(PostItemEdit);
