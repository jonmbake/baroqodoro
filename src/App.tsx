import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container'
import Main from './pages/Main';
import Log from './pages/Log';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Container className="mt-5">
        <Switch>
          <Route path="/" component={ Main } exact/>
          <Route path="/log" component={ Log } exact/>
        </Switch>
      </Container>
    </div>
    </BrowserRouter>
  );
}

export default App;
