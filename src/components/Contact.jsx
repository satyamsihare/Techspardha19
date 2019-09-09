import React from 'react';
import Back from './Back';
import Loading from './Loading';
const Contact = props => {

  return (
    <>
    <Loading title="contact"/>
    <div className='c-container'>
      <Back history={props} />
      <h1>Contact</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
    </>
  );
};

export default Contact;
