import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ArrowRepeat, MusicNoteBeamed, Shuffle, VolumeMute } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';
import songs from '../songs.json';
import { TimerMode } from '../App';

export enum PlayMode {
  Serial,
  Repeat,
  Shuffle
}

interface AudioPlayerProps {
  playTrack: boolean,
  timerMode: TimerMode | undefined
}

const sortedSongs = songs.sort((a, b) => a.composer > b.composer ? 1 : -1);

const AudioPlayer = ({timerMode, playTrack}: AudioPlayerProps) => {
  const [playMode, setPlayMode] = useState(PlayMode.Serial);
  const [isMuted, setMuted] = useState(false);
  const [selectedSong, setSelectedSong] = useState(sortedSongs[0].downloadUrl)

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playTrack) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
  }, [selectedSong, playTrack]);

  // Mute and pause when taking a break
  useEffect(() => {
    if (timerMode === TimerMode.Focus) {
      setMuted(false);
    } else {
      audioRef.current!.pause();
      setMuted(true);
    }
  }, [timerMode]);

  function onAudioEnded () {
    if (playMode === PlayMode.Repeat) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
    } else if (playMode === PlayMode.Shuffle) {
      setSelectedSong(sortedSongs[Math.floor(Math.random() * sortedSongs.length)].downloadUrl);
    } else {
      let i =  sortedSongs.findIndex(s => s.downloadUrl === selectedSong);
      if (i === sortedSongs.length - 1) {
        i = 0;
      } else {
        ++i;
      }
      setSelectedSong(sortedSongs[i].downloadUrl);
    }
  }

  const songsSelections = sortedSongs.map((s, i) => {
    return (
      <option key={ i } value={ s.downloadUrl }>{ s.composer } - { s.title }</option>
    );
  });

  return (
    <Row className="justify-content-center mt-5">
      <Col sm lg="8" className="text-center">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><MusicNoteBeamed /></InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control as="select" onChange={ (e: ChangeEvent<any>) => { setSelectedSong(e.target.value)} } value={ selectedSong }>
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
      <audio style={ {"display": "none"} } ref={ audioRef } src={ selectedSong } muted={ isMuted } onEnded={ onAudioEnded } />
      </Col>
    </Row>
  );
};

export default AudioPlayer;