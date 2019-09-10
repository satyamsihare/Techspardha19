import React from 'react';
import Back from './Back';
const About = props => {
  return (
    <div className='c-container'>
      <Back history={props} />
      <h1>/about</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
  );
};

export default About;
