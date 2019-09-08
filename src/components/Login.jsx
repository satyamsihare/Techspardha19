import React from 'react';
import Back from './Back';

const Login = props => {
  return (
    <div className='c-container'>
      <Back history={props} />
      <h1>Login</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
  );
};

export default Login;
