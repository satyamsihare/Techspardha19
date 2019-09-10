import React, { useState, useEffect, useContext } from 'react';
import Baffle from 'baffle-react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config.json';
import Context from '../contextStore/Context';
import axios from 'axios';
const Home = () => {
  const { state, dispatch } = useContext(Context);
  const { isAuth } = state;
  const [obfuscate, setObfuscate] = useState({
    obs: true
  });
  const [istate, setState] = useState({
    check: true
  });
  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      setObfuscate({
        ...obfuscate,
        obs: false
      });
    }, 200);
    setTimeout(() => {
      setState({
        ...istate,
        check: false
      });
    }, 3000);

    return function cleanup() {
      abortController.abort();
    };
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
      <div className='container'>
        <div className='Menu'>
          <div className='title-main'>
            <Baffle speed={150} obfuscate={obfuscate.obs}>
              TECHSPARDHA/2019
            </Baffle>
          </div>
          <ul>{homeList}</ul>
        </div>
        <br />
        <div className='user-content'>
          {istate.check ? <p>checking for auth status...</p> : null}
          <ul>
            {state.user && <li>{'> sudo/current_user'}</li>}
            {state.user && <li>{state.user.name}</li>}
            {state.user && (
              <img className='l-user' src={state.user.picture} alt='user-img' />
            )}
            {isAuth ? (
              <li className='pointer'>
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
              <li className='pointer'>
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
