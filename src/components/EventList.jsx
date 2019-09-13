import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Context from '../contextStore/Context';
import Loading from './Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
const EventList = props => {
  const category = props.match.params.category;
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    events: []
  });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/events'
        );
        setState({
          ...istate,
          events: res.data.data.events
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
    getEvents();
  }, []);
  console.log(istate);
  if (istate.events.length <= 0) return <p>fetching events..</p>;
  return (
    <>
      <Loading title={`${category}`} />
      <div className='c-container'>
        <Back history={props} />
        <h1>{`/${category}`}</h1>
        <div className='ievent-list'>
          <ul>
            {istate.events
              .filter(event => event.eventCategory === category)
              .map((event, index) => (
                <Link key={index} to={`/events/${category}/${event.eventName}`}>
                  <li className='cnt-item'>> {event.eventName}</li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventList;
