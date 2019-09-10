import React, { useEffect, useContext, useState } from 'react';
import Context from '../contextStore/Context';
import Loading from './Loading';
import Back from './Back';

import axios from 'axios';

const Contact = props => {
  const { dispatch } = useContext(Context);
  const [contactDetails, setContactDetails] = useState({
    contacts: []
  });

  const getContact = async () => {
    try {
      const res = await axios.get(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/contacts'
      );
      setContactDetails({
        ...contactDetails,
        contacts: res.data.data.contacts
      });
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'Error Occured: Try refreshing' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  console.log(contactDetails);

  return (
    <>
    <Loading title="contact"/>
    <div className='c-container'>
      <Back history={props} />
      <h1>/contact</h1>
      <p className='devText'>Developed by Technobyte</p>
    </div>
    </>
  );
};

export default Contact;
