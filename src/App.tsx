import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Timer, { TimerState, TimerMode } from './components/Timer';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [timerState, setTimerState] = useState(TimerState.Paused);
  const [timerMode, setTimerMode] = useState(TimerMode.Focus);

  useEffect(() => {
    const keyboardShortcuts = (event: any) => {
      if (event.code === 'Space') {
        setTimerState(currTimerState => TimerState.Paused === currTimerState ? TimerState.Started : TimerState.Paused)
      }
    };
    document.addEventListener('keyup', keyboardShortcuts);
    return function cleanup() {
      document.removeEventListener('keyup', keyboardShortcuts);
    };
  }, []);

  let audioPlayer;
  //if (timerMode === TimerMode.Focus) {
  audioPlayer = <AudioPlayer timerMode={ timerMode } timerState={ timerState } />;
  //}
  return (
    <div className="App">
      <Navbar/>
      <Container>
        <Row className="justify-content-center mt-5">
            <ButtonGroup>
              <Button variant="outline-secondary" className={ timerMode === TimerMode.Focus ? 'active' : '' } onClick={ () => setTimerMode(TimerMode.Focus) }>Focus</Button>
              <Button variant="outline-secondary" className={ timerMode === TimerMode.ShortBreak ? 'active' : '' } onClick={ () => setTimerMode(TimerMode.ShortBreak) }>Short Break</Button>
              <Button variant="outline-secondary" className={ timerMode === TimerMode.LongBreak ? 'active' : '' } onClick={ () => setTimerMode(TimerMode.LongBreak) }>Long Break</Button>
            </ButtonGroup>
        </Row>
        <Timer timerState={ timerState } timerMode={ timerMode } setTimerState={ setTimerState } />
        { audioPlayer }
        <Row className="justify-content-center mt-5">
          <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="primary" onClick={ () => setTimerState(TimerState.Started) }>Start</Button></Col>
          <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="warning" onClick={ () => setTimerState(TimerState.Paused) }>Pause</Button></Col>
          <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="danger" onClick={ () => setTimerState(TimerState.Reset) }>Reset</Button></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
