import React from 'react';
import MusicPlayer from '../../components/MusicPlayer';

function Player(props) {
  const { musics } = props;
  return <MusicPlayer musics={musics} />;
}

export default Player;
