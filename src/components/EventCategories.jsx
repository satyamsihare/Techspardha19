import React from 'react';
import Back from './Back';
import Loading from './Loading';
import EventsList from './EventsList';

const EventCategories = props => {
  return (
    <>
    <Loading title="events"/>
      <div className='c-container'>
        <Back history={props} />
        <h1>/event_categories</h1>
        <EventsList />
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </>
  );
};

export default EventCategories;
