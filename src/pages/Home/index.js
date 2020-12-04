/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../context/firebase';
import HomeContainer from '../../containers/Home';
import SideBar from '../../components/SideBar';

import ENV from '../../constants/environment/common.env';

const getAlbums = () => axios.get(`${ENV.apiUrl}/get-albums`);

function Home(props) {
  const { IN_APP_ROUTES } = props;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getAlbums();
      setAlbums(res.data);
    }
    fetch();
  }, []);

  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content">
        <HomeContainer albums={albums} {...props} />
      </div>
    </>
  );
}

export default compose(withFirebase, withRouter)(Home);
