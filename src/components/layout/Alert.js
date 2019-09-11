import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return (
    alert !== null && (
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
