import React, { useContext, useState } from 'react';
import Back from './Back';
import Loading from './Loading';
import Context from '../contextStore/Context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const Onboard = props => {
  const { state, dispatch } = useContext(Context);
  const [formData, setFormData] = useState({
    phone: '',
    college: '',
    year: ''
  });

  if (state.user == null || state.user.onBoard == true)
    return <Redirect to='/' />;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    const body = JSON.stringify({
      ...formData,
      email: state.user.email
    });
    console.log(body);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: state.token
        }
      };
      const res = await axios.put(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/user',
        body,
        config
      );
      console.log('yay', res);

      dispatch({
        type: 'ONBOARDED',
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loading title='devs' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/onboard</h1>
        <h2>hey@{state.user.name}</h2>
        <p>> welcome_to_techspatdha/2019</p>

        <div className='form'>
          <form onSubmit={onSubmit}>
            <label htmlFor='phone'>phone_no</label>
            <div className='form-item'>
              <input
                name='phone'
                onChange={handleChange}
                type='text'
                required='required'
              />
            </div>
            <label htmlFor='college'>college</label>
            <div className='form-item'>
              <input
                name='college'
                onChange={handleChange}
                type='text'
                required='required'
              />
            </div>
            <label htmlFor='year'>year</label>
            <div className='form-item'>
              <select name='year' onChange={handleChange} required='required'>
                <option value='1'>1st</option>
                <option value='2'>2nd </option>
                <option value='3'>3rd</option>
                <option value='4'>4th</option>
              </select>
            </div>
            <button>send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboard;
