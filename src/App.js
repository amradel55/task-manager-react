import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import IsAuth from './actions/IsAuth';
import Header from './components/Header/Header';
import Routers from './Routers';

 function  App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
      <Header isAuth={IsAuth()} />
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
