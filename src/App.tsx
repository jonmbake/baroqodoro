import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container'
import Timer from './pages/Timer';
import History from './pages/History';
import SettingsPage from './pages/Settings';
import useStateWithLocalStorage from './util/storageState';
import About from './pages/About';
import TaskBar from './components/TaskBar';

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
  const [isRunning, setIsRunning] = useState(false);

  return (
    <HashRouter>
    <div className="App">
      <Navbar settings={ settings } history={ history }/>
      <TaskBar isRunning={ isRunning } />
      <Container className="mt-5">
        <Switch>
          <Route path="/" exact>
            <Timer setHistory={ setHistory } setIsRunning={ setIsRunning }/>
          </Route>
          <Route path="/about" >
            <About />
          </Route>
          <Route path="/history" >
            <History settings={ settings } history={ history } setHistory={ setHistory } />
          </Route>
          <Route path="/settings">
            <SettingsPage settings={ settings } setSettings={ setSettings }/>
          </Route>
        </Switch>
      </Container>
    </div>
    <footer className="footer">
      <div className="container">
        <a href="mailto:jonmbake@gmail.com">Contact</a> · <a target="_blank" rel="noreferrer" href="https://github.com/jonmbake/baroqodoro">Github</a>
      </div>
    </footer>
    </HashRouter>
  );
}

export default App;
