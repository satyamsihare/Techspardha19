import React, { useState, useEffect, useContext } from 'react';
import Baffle from 'baffle-react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config.json';
import Context from '../contextStore/Context';
import axios from 'axios';
import Loading from './Loading';
import Grains from './Grains';
const Home = () => {
  const { state, dispatch } = useContext(Context);
  const { isAuth } = state;
  const [obfuscate, setObfuscate] = useState({
    obs: true
  });

  useEffect(() => {
    setTimeout(() => {
      setObfuscate({
        ...obfuscate,
        obs: false
      });
    }, 200);
  }, []);

  const list = [
    '/about',
    '/events',
    '/sponsors',
    '/faqs',
    '/ask_queries',
    '/contact'
  ];
  const homeList = list.map((item, index) => (
    <li key={index}>
      <Link to={item}>
        <Baffle speed={150} obfuscate={obfuscate.obs} revealDelay={400}>
          {item}
        </Baffle>
      </Link>
    </li>
  ));

  const onsuccess = async user => {
    try {
      const id_token = user.getAuthResponse().id_token;
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ idToken: id_token });

      const res = await axios.post(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/login',
        body,
        config
      );

      console.log(res.data);
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: res.data
      });
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'user auth success.' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: error.data.message }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };
  const onfailure = () => {
    console.log('nopie');
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
    dispatch({
      type: 'ADD_ERROR',
      payload: { msg: 'user logged out.' }
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ERRORS'
      });
    }, 3000);
  };
  return (
    <>

    <Loading title="home"/>
      <div className='container'>
        <div className='Menu'>
          <div className='title-main'>
            <Baffle speed={150} obfuscate={obfuscate.obs}>
              TECHSPARDHA/2019
            </Baffle>
          </div>

          <ul>

            {homeList}
            {isAuth ? (

              <li>

                <GoogleLogout
                  clientId={config.GIDKEY}
                  render={renderProps => (
                    <p
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      /logout
                    </p>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy={'single_host_origin'}
                />
              </li>
            ) : (
              <li>
                <GoogleLogin
                  clientId={config.GIDKEY}
                  render={renderProps => (
                    <p
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      {'/auth <Signin/Signup>'}
                    </p>
                  )}
                  isSignedIn={true}
                  onSuccess={onsuccess}
                  onFailure={onfailure}
                />
              </li>
            )}
          </ul>
        </div>
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </>
  );
};

export default Home;
