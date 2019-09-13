import React, { useState, useEffect, useContext } from 'react';
import Baffle from 'baffle-react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config.json';
import Context from '../contextStore/Context';
import axios from 'axios';
import Loading from './Loading';
import LinesRain from './LinesRain.jsx';
const Home = () => {
  // document.body.scroll = "yes";
  document.body.style.overflow = 'hidden';
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
    }, 300);
    setTimeout(() => {
      setState({
        ...istate,
        check: false
      });
    }, 2000);

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const list = [
    '/about',
    '/events',
    '/sponsors',
    '/ask_queries',
    '/contact',
    '/devs'
  ];
  const homeList = list.map((item, index) => (
    <li key={index}>
      <Link to={item}>
        <Baffle speed={150} obfuscate={obfuscate.obs}>
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
  let text="",i=0;
  function name(n){
    while(i<n.length)
    {
      if(n[i]==' '){
        text+='_';
        i++;
      } else {
        text+=n[i];
        i++;
      }
    }
    return text;
  }
  return (
    <div className="Lightning">
      <Loading title='home' />
      <LinesRain />
      <div className='container'>
      <div className='move-user'>
      <div className='user-img'>
        {state.user && (
          <img className='l-user' src={state.user.picture} alt='user-img' />
        )}
        </div>
        <div className='sudo'>

        {state.user && <p>@+{name(state.user.name)}/</p>}
        {isAuth ? (
          <div>
            <GoogleLogout
              clientId={config.GIDKEY}
              render={renderProps => (
                <p className="p-logout"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {'<logout>'}
                </p>
              )}
              onLogoutSuccess={logout}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        ) : (
          <div className='signin'>
            <GoogleLogin
              clientId={config.GIDKEY}
              render={renderProps => (
                <p className="p-signin"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {'<Signin/Signup>'}
                </p>
              )}
              isSignedIn={true}
              onSuccess={onsuccess}
              onFailure={onfailure}
            />
          </div>
        )}
        </div>

      </div>
        <div className='Menu'>
          <div className='title-main'>
            <Baffle speed={150} obfuscate={obfuscate.obs}>
              TECHSPARDHA/2019
            </Baffle>
          </div>
          <ul>{homeList}</ul>
        </div>
        <br />
        <div className="logo"><a href="#">
        <img className="blueLogo" src="techLogoGlitchBlue.png"/>
        <img className="redLogo" src="techLogoGlitchRed.png"/>
        <img className="mainLogo" src="techLogo.png"/></a>
        </div>
        <p className='devText'>Developed by Technobyte</p>
      </div>
    </div>
  );
};

export default Home;
