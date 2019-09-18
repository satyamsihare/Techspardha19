import React, { useContext, useState, useEffect } from 'react';
import Loading from './Loading';
import Back from './Back';
import Context from '../contextStore/Context';
import axios from 'axios';
const Dashboard = props => {
  const { state, dispatch } = useContext(Context);
  const [istate, setState] = useState([]);
  useEffect(() => {
    const getRegisteredEvents = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/user/event',
          {
            headers: {
              authorization: state.token
            }
          }
        );
        setState([...res.data.data.events]);
      } catch (error) {}
    };

    getRegisteredEvents();
  }, []);

  const eventList =
    istate.length > 0 ? (
      istate.map(event => (
        <div className='reg-eve'>
          <div>
            <p>{event.eventName}</p>
          </div>
          <div>
            <p>{event.startTime}</p>
          </div>
        </div>
      ))
    ) : (
      <p>no registered events.</p>
    );

  const { phone, name, college, year } = state.user;
  return (
    <>
      <Loading title='dashboard' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/dashboard</h1>
        <div className='details'>
          <h3>sudo@{name}</h3>
          <p>
            <span className='bold'>college></span>
            {college}
          </p>
          <p>
            <span className='bold'>phone></span>
            {phone}
          </p>
          <p>
            <span className='bold'>year></span>
            {year}
          </p>
        </div>
        <div className='reg-events'>
          <h4>registered_events:</h4>
          {eventList}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
