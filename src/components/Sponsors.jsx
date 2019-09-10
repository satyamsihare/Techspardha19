import React from 'react';
import Back from './Back';
import Loading from './Loading';
const Sponsors = props => {
  return (
    <>
    <Loading title="sponsors"/>
    <div className='c-container'>
      <Back history={props} />
      <h1>Sponsors</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
    </>
  );
};

export default Sponsors;
