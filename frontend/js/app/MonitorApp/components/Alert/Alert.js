import React from 'react';

import './style.scss';

const Alert = (props) => {
  if (!props.error){
    return null
  }


  return (
    <div className="alert-modal">
      <div className="alert-content">
        <div className="alert-title">
          <h3 className="title">I am so sorry!</h3>
          <span className="close" >&times;</span>
        </div>
        <p>{ props.message }</p>
        </div>
    </div>
  );

}

export default Alert;
