import React from 'react';
import Back from './Back';

const Events = props => {
  return (
    <>
      <div className='c-container'>
        <Back history={props} />
        <h1>Events</h1>
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </>
  );
};

export default Events;
