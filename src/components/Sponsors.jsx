import React from 'react';
import Back from './Back';
import Loading from './Loading';
const Sponsors = props => {
  document.body.style.overflow = 'auto';
  return (
    <>
      <Loading title='sponsors' />
      <div className='c-container'>
        <Back history={props} />
        <h1>Sponsors</h1>
      </div>
    </>
  );
};

export default Sponsors;
