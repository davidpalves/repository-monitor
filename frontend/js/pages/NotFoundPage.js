import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/pages/404.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found-wrapper">
      <h1 className="not-found-title">If you are going, go in peace.</h1>
      <h4 className="not-found-subtitle">But, if you are just lost, I suggest you to</h4>
      <Link className="redirect-home" to="/">
        Go Home
      </Link>
    </div>
  );
};
export default NotFoundPage;
