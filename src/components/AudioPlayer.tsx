import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ArrowRepeat, MusicNoteBeamed, Shuffle, VolumeMute } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import songs from '../songs.json';
import { TimerMode, TimerState } from './Timer';

export enum PlayMode {
  Serial,
  Repeat,
  Shuffle
}

interface AudioPlayerProps {
  timerState: TimerState,
  timerMode: TimerMode
}

const sortedSongs = songs.sort((a, b) => a.composer > b.composer ? 1 : -1);

const AudioPlayer = (props: AudioPlayerProps) => {
  const songSelectRef = useRef<HTMLSelectElement>(null)
  const [playMode, setPlayMode] = useState(PlayMode.Serial);
  const [isMuted, setMuted] = useState(false);
  const createAudio = (songSrc: string) => {
    const a = new Audio(songSrc);
    a.onended = () => {
      if (playMode === PlayMode.Repeat) {
        songAudioRef.current.play();
      } else if (playMode === PlayMode.Shuffle) {
        const songSrc = songSelectRef.current!.value = sortedSongs[Math.floor(Math.random() * sortedSongs.length)].downloadUrl;
        updateSong(songSrc);
      } else {
        let i =  songSelectRef.current!.selectedIndex;
        if (i === sortedSongs.length - 1) {
          i = 0;
        } else {
          ++i;
        }
        const songSrc = songSelectRef.current!.value = sortedSongs[i].downloadUrl;
        updateSong(songSrc);
      }
    };
    return a;
  }
  const songAudioRef = useRef(createAudio(sortedSongs[0].downloadUrl));

  const songsSelections = sortedSongs.map((s, i) => {
    return (
      <option key={ i } value={ s.downloadUrl }>{ s.composer } - { s.title }</option>
    );
  });

  useEffect(() => {
    if (props.timerMode === TimerMode.Focus && props.timerState === TimerState.Started) {
      songAudioRef.current.play();
    } else {
      songAudioRef.current.pause();
    }
  }, [props.timerState, props.timerMode]);

  useEffect(() => {
    if (props.timerMode === TimerMode.Focus) {
      setMuted(false);
    } else {
      songAudioRef.current.pause();
      setMuted(true);
    }
  }, [props.timerMode]);


  useEffect(() => {
    songAudioRef.current.muted = isMuted;
  }, [isMuted]);

  function updateSong (songSrc: string) {
    songAudioRef.current.pause();
    songAudioRef.current.src = songSrc;
    if (props.timerState === TimerState.Started) {
      songAudioRef.current.play();
    } else {
      songAudioRef.current.load();
    }
  }

  return (
    <Row className="justify-content-center mt-5">
      <Col sm lg="8" className="text-center">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><MusicNoteBeamed /></InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control as="select" ref={ songSelectRef} onChange={ (e: ChangeEvent<any>) => { updateSong(e.target.value)} }>
          { songsSelections }
        </Form.Control>
        <InputGroup.Append>
          <Button title="Repeat the currently selected track" className={ playMode === PlayMode.Repeat ? 'active' : '' }
            onClick={ () => setPlayMode(currPlayMode => currPlayMode === PlayMode.Repeat ? PlayMode.Serial : PlayMode.Repeat) } variant="outline-secondary"><ArrowRepeat/></Button>
          <Button title="Pick the next track randomly" className={ playMode === PlayMode.Shuffle ? 'active' : '' }
            onClick={ () => setPlayMode(currPlayMode => currPlayMode === PlayMode.Shuffle ? PlayMode.Serial : PlayMode.Shuffle) } variant="outline-secondary"><Shuffle/></Button>
          <Button title="Mute" className={ isMuted ? 'active' : '' }
            onClick={ () => setMuted(m => !m) } variant="outline-secondary"><VolumeMute/></Button>
        </InputGroup.Append>
      </InputGroup>
      <small className="text-muted">Music courtesy of <a href="http://www.baroquemusic.org/">baroquemusic.org</a></small>
      </Col>
    </Row>
  );
};

export default AudioPlayer;