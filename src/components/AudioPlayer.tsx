import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ArrowRepeat, FileMusic, Shuffle } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import songs from '../songs.json';
import { TimerState } from './Timer';

export enum PlayMode {
  Serial,
  Repeat,
  Shuffle
}

interface AudioPlayerProps {
  timerState: TimerState
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const sortedSongs = songs.sort((a, b) => a.composer > b.composer ? 1 : -1);
  const songAudioRef = useRef(new Audio(sortedSongs[0].downloadUrl));
  const [playMode, setPlayMode] = useState(PlayMode.Serial);

  const songsSelections = sortedSongs.map((s, i) => {
    return (
      <option key={ i } value={ s.downloadUrl }>{ s.composer } - { s.title }</option>
    );
  });

  useEffect(() => {
    if (props.timerState === TimerState.Started) {
      songAudioRef.current.play();
    } else {
      songAudioRef.current.pause();
    }
  }, [props.timerState]);

  function updateSong (e: ChangeEvent<any>) {
    songAudioRef.current.pause();
    songAudioRef.current = new Audio(e.target.value);
    if (props.timerState === TimerState.Started) {
      songAudioRef.current.play();
    }
  }

  return (
    <Row className="justify-content-center mt-5">
      <Col sm lg="8" className="text-center">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><FileMusic /></InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control as="select" onChange={ updateSong } >
          { songsSelections }
        </Form.Control>
        <InputGroup.Append>
          <Button className={ playMode === PlayMode.Repeat ? 'active' : '' }
            onClick={ () => setPlayMode(currPlayMode => currPlayMode === PlayMode.Repeat ? PlayMode.Serial : PlayMode.Repeat) } variant="outline-secondary"><ArrowRepeat/></Button>
          <Button className={ playMode === PlayMode.Shuffle ? 'active' : '' }
            onClick={ () => setPlayMode(currPlayMode => currPlayMode === PlayMode.Shuffle ? PlayMode.Serial : PlayMode.Shuffle) } variant="outline-secondary"><Shuffle/></Button>
        </InputGroup.Append>
      </InputGroup>
      <small className="text-muted">Music courtesy of <a href="http://www.baroquemusic.org/">baroquemusic.org</a></small>
      </Col>
    </Row>
  );
};

export default AudioPlayer;