import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Loading from './Loading';
import axios from 'axios';
import Context from '../contextStore/Context';
import { Link } from 'react-router-dom';
const Sponsors = props => {
  const titleSpon =
    'https://yt3.ggpht.com/a-/AN66SAyMrep39LM9mP3UoP9divyz3PI2Y90cyJ7sDA=s900-mo-c-c0xffffffff-rj-k-no';
  document.body.style.overflow = 'auto';
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    sponsors: []
  });
  useEffect(() => {
    const getSponsors = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/sponsors'
        );
        setState({
          ...istate,
          sponsors: res.data.data.paisa
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
    getSponsors();
  }, []);
  console.log(istate);

  return (
    <>
      <Loading title='sponsors' />
      <div className='c-container'>
        <Back history={props} />
        <h1>Sponsors</h1>
        <div>
          {istate.sponsors.map((sponsor, index) => (
            <div key={index}>
              <h1>{sponsor.sponsorSection}</h1>
              {sponsor.sponsors.map((url, index2) => (
                <img
                  key={index2}
                  className='sponsor'
                  src={url.imageUrl}
                  target={url.targetUrl}
                ></img>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sponsors;
