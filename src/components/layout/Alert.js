import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert != null && (
      <div className="alert col s12 m4 l4">
        <p>
          <i className="material-icons left">info</i>
          {alert.msg}
        </p>
      </div>
    )
  );
};

export default Alert;
