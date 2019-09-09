import React from 'react';
import Back from './Back';
import Loading from './Loading';
const Faqs = props => {
  return (
    <>
    <Loading title="faqs"/>
    <div className='c-container'>
      <Back history={props} />
      <h1>FAQs</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
    </>
  );
};

export default Faqs;
