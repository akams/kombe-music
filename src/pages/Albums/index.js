import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from '../../context/firebase';

import AlbumsContainer from '../../containers/Albums';

import ENV from '../../constants/environment/common.env';

const getAlbums = (payload) => axios.get(`${ENV.apiUrl}/get-albums`, payload);

function Albums(props) {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    async function fetch() {
      const param = { params: { limit: 9 } };
      const res = await getAlbums(param);
      setAlbums(res.data);
    }
    fetch();
  }, []);
  return <AlbumsContainer albums={albums} {...props} />;
}

export default compose(withFirebase, withRouter)(Albums);
