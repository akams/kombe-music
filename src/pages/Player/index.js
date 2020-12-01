import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlayerContainer from '../../containers/Player';

import ENV from '../../constants/environment/common.env';

const getMusics = (payload) => axios.get(`${ENV.apiUrl}/get-musics`, payload);

function Player() {
  const [musics, setMusics] = useState([]);
  const { idAlbum } = useParams();

  useEffect(() => {
    async function fetch() {
      const param = { params: { idAlbum } };
      const res = await getMusics(param);
      setMusics(res.data);
    }
    fetch();
  }, []);
  return <PlayerContainer musics={musics} />;
}

export default Player;
