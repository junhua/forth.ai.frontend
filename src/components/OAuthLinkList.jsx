import React from 'react';
import { ROOT_URL } from '../utils';

function OAuthLinkList() {
  return (
    <div>
      {false && <p className="description text-center">or sign in with one of these services</p>}
      <div className="bottons text-center">
        <a className="btn btn-default btn-facebook" href={`${ROOT_URL}/accounts/facebook/login/`}>
          <i className="fa fa-facebook-official fa-2x fa-icon facebook-official-color" aria-hidden="true" />
          <span>FACEBOOK</span>
        </a>
        {/* <a className="btn btn-default btn-github" href={`${ROOT_URL}/accounts/github/login/`}>
          <i className="fa fa-github fa-2x fa-icon github-color" aria-hidden="true" />
          <span>GITHUB</span>
        </a>*/}
        {/* <a className="btn btn-default btn-google" href={`${ROOT_URL}/accounts/google/login/`}>
          <i className="fa fa-google fa-2x fa-icon google-color" aria-hidden="true" />
          <span>GOOGLE</span>
        </a>*/}
      </div>
    </div>
  );
}

export default OAuthLinkList;
