import React, { useContext, useReducer } from 'react';
import Context from './contextStore/Context';
import reducer from './reducers/rootReducer';

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <h1>Workin bruh!</h1>
    </Context.Provider>
  );
}

export default App;
