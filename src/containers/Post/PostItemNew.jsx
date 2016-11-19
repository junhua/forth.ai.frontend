import React from 'react';

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

function PostItemNew() {
  return (
    <div className="mb-1_5em post-item-new">
      <form className="post-form" onSubmit={(e) => { e.preventDefault(); }}>
        <input type="url" className="form-control mb-1_5em" placeholder="URL" pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?" />
        <div className="only-draft">
          <div className="composer-wrapper">
            <div className="backdrop">
              <div className="highlights">somthing</div>
            </div>
            <div className="composer-textarea-wrapper mb-1_5em">
              <textarea
                className="form-control composer"
                placeholder={'"What do you want to share?"'}
                autoComplete="off"
                onChange={handleInput}
              />
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
            <button type="submit" className="btn btn-default pull-right btn-post fw-bolder">POST</button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default PostItemNew;
