import React, { useContext, useReducer } from 'react';
import Context from './contextStore/Context';
import reducer from './reducers/rootReducer';
import Home from './components/Home';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import EventCategories from './components/EventCategories';
import Error404 from './components/Error404';
import Devs from './components/Dev';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Alert from './components/Alert';
import Auth from './components/Auth';
import Query from './components/Query';
import About from './components/About';

import Grains from './components//Grains';
import ContactDetails from './components/ContactDetails';
import EventList from './components/EventList';
import Event from './components/Event';

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <>
      <Context.Provider
        value={{
          state,
          dispatch
        }}
      >
        <Alert />
        <Grains />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/events/:category/:event' component={Event} />
            <Route path='/events/:category' component={EventList} />
            <Route path='/events' component={EventCategories} />
            <Route path='/about' component={About} />
            <Route path='/devs' component={Devs} />
            <Route path='/auth' component={Auth} />
            <Route path='/ask_queries' component={Query} />
            <Route path='/contact/:section' component={ContactDetails} />
            <Route path='/sponsors' component={Sponsors} />
            <Route path='/contact' component={Contact} />
            <Route component={Error404} />{' '}
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
