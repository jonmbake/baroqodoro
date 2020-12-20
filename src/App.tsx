import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container'
import Timer from './pages/Timer';
import Log from './pages/Log';
import SettingsPage from './pages/Settings';
import useStateWithLocalStorage from './util/storageState';

export class Settings {
  constructor (
    public dailyGoal: number = 8
  ) {}
}

export class HistoryItem {
  constructor (
    public timerMode: string,
    public completed: string,
    public notes: string,
  ) {}
}

const App = () => {
  const [history, setHistory] = useStateWithLocalStorage<Array<HistoryItem>>('baroqodoroLog', [], window.localStorage);
  const [settings, setSettings] = useStateWithLocalStorage<Settings>('baroqodoroSettings', new Settings(), window.localStorage)

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar settings={ settings } history={ history }/>
      <Container className="mt-5">
        <Switch>
          <Route path="/" exact>
            <Timer setHistory={ setHistory } />
          </Route>
          <Route path="/log" >
            <Log history={ history } setHistory={ setHistory } />
          </Route>
          <Route path="/settings">
            <SettingsPage settings={ settings } setSettings={ setSettings }/>
          </Route>
        </Switch>
      </Container>
    </div>
    </BrowserRouter>
  );
}

export default App;
