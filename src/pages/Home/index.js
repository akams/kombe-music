import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPlayer from '../../components/MusicPlayer';

import ENV from '../../constants/environment/common.env';

const getMusics = () => axios.get(`${ENV.apiUrl}/get-musics`);

function Home() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getMusics();
      setMusics([
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
        res.data[0],
      ]);
    }
    fetch();
  }, []);

  return <MusicPlayer musics={musics} />;
}

export default Home;
