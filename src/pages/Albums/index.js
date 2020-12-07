import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from '../../context/firebase';
import { useWindowScreen } from '../../hooks';

import AlbumsContainer from '../../containers/Albums';
import SideBar from '../../components/SideBar';

import ENV from '../../constants/environment/common.env';

const getAlbums = (payload) => axios.get(`${ENV.apiUrl}/get-albums`, payload);

function Albums(props) {
  const { IN_APP_ROUTES } = props;
  const [albums, setAlbums] = useState([]);
  const { width: widthScreen } = useWindowScreen();
  const isSmallDevice = widthScreen < 768;

  useEffect(() => {
    async function fetch() {
      const param = { params: { limit: 9 } };
      const res = await getAlbums(param);
      setAlbums(res.data);
    }
    fetch();
  }, []);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <main className={isSmallDevice ? 'smallDevice' : ''}>
        <AlbumsContainer albums={albums} {...props} />
      </main>
    </>
  );
}

export default compose(withFirebase, withRouter)(Albums);
