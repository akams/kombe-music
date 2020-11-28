import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { compose } from 'recompose';
import MusicPlayer from '../../components/MusicPlayer';

import { withFirebase } from '../../context/firebase';

import ENV from '../../constants/environment/common.env';

const getMusics = () => axios.get(`${ENV.apiUrl}/get-musics`);

function Home(props) {
  const { firebase } = props;
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getMusics();
      setMusics(res.data);
    }
    fetch();
  }, []);

  return <MusicPlayer musics={musics} />;
}

export default compose(withFirebase)(Home);
