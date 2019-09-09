import React from 'react';
import Back from './Back';
import EventsList from './EventsList';

const EventCategories = props => {
  return (
    <>
      <div className='c-container'>
        <Back history={props} />
        <h1>Event Categories</h1>
        <EventsList />
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </>
  );
};

export default EventCategories;
