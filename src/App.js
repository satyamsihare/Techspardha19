import React, { useContext, useReducer } from 'react';
import Context from './contextStore/Context';
import reducer from './reducers/rootReducer';
import Home from './components/Home';
import Loading from './components/Loading';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Events from './components/Events';
import { createBrowserHistory } from 'history';
import Error404 from './components/Error404';
import Faqs from './components/Faqs';
import Sponsors from './components/Sponsors';
import Login from './components/Login';
import Contact from './components/Contact';

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Loading />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/events' component={Events} />
          <Route path='/faqs' component={Faqs} />
          <Route path='/sponsors' component={Sponsors} />
          <Route path='/login' component={Login} />
          <Route path='/contact' component={Contact} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
