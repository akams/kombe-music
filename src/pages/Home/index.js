import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import HomeContainer from '../../containers/Home';

import { withFirebase } from '../../context/firebase';

import ENV from '../../constants/environment/common.env';

const getAlbums = () => axios.get(`${ENV.apiUrl}/get-albums`);

function Home(props) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getAlbums();
      setAlbums(res.data);
    }
    fetch();
  }, []);
  return <HomeContainer albums={albums} {...props} />;
}

export default compose(withFirebase, withRouter)(Home);
