import React from 'react';
import Back from './Back';

const Sponsors = props => {
  return (
    <div className='c-container'>
      <Back history={props} />
      <h1>Sponsors</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
  );
};

export default Sponsors;
