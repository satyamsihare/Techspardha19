import React from 'react';
import Back from './Back';
const Faqs = props => {
  return (
    <div className='c-container'>
      <Back history={props} />
      <h1>FAQs</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
  );
};

export default Faqs;
