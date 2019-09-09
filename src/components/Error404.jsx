import React from 'react';
const Error404 = props => {
  return (
    <div className='c-container'>
      <p className='back' onClick={() => props.history.push('/')}>
        /
      </p>
      <h1>Error 404</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
  );
};

export default Error404;
