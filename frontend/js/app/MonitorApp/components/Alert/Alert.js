import React from 'react';

import './style.scss';

const Alert = (props) => {
  const { error, handleDismissAlert, message } = props;

  if (!error) {
    return null;
  }

  return (
    <div className="alert-modal">
      <div className="alert-content">
        <button className="close" type="button" onClick={handleDismissAlert}>
          &times;
        </button>
        <div className="alert-title">
          <h3 className="title">I am so sorry!</h3>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
