import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PlayerContainer from '../../containers/Player';

import SideBar from '../../components/SideBar';
import { useWindowScreen } from '../../hooks';

import ENV from '../../constants/environment/common.env';

const getMusics = (payload) => axios.get(`${ENV.apiUrl}/get-musics`, payload);
const getMusic = (payload) => axios.get(`${ENV.apiUrl}/get-music`, payload);

function Player(props) {
  const [musics, setMusics] = useState([]);
  const [lastDocument, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const {
    location: { pathname },
    IN_APP_ROUTES,
  } = props;
  // query param
  const { idAlbum, idMusic, author, albumName } = useParams();

  const fetchData = async () => {
    try {
      const param = { params: { idAlbum } };
      const res = await getMusics(param);
      const { datas, last } = res.data;
      setMusics(datas);
      setLastVisible(last);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreData = async () => {
    try {
      const param = { params: { idAlbum, lastVisible: lastDocument } };
      const res = await getMusics(param);
      const { datas, last } = res.data;
      if (datas.length === 0) {
        setHasMore(false);
      }
      setMusics([...musics, ...datas]);
      setLastVisible(last);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataWithOptionQuery = async (param) => {
    const { params } = param;
    if (params.id) {
      const res = await getMusic(param);
      const { datas } = res.data;
      setMusics(datas);
    } else if (params.albumName) {
      const res = await getMusic(param);
      const { datas, last } = res.data;
      setMusics(datas);
      setLastVisible(last);
    } else if (params.author) {
      const res = await getMusic(param);
      const { datas, last } = res.data;
      setMusics(datas);
      setLastVisible(last);
    }
  };

  useEffect(() => {
    async function fetch() {
      if (pathname.indexOf('/recherche/album') >= 0) {
        const param = { params: { albumName } };
        await fetchDataWithOptionQuery(param);
      } else if (pathname.indexOf('/recherche/author') >= 0) {
        const param = { params: { author } };
        await fetchDataWithOptionQuery(param);
      } else if (pathname.indexOf('/recherche/music') >= 0) {
        const param = { params: { id: idMusic } };
        await fetchDataWithOptionQuery(param);
      } else {
        await fetchData();
      }
    }
    fetch();
  }, []);
  const { width: widthScreen } = useWindowScreen();
  const isSmallDevice = widthScreen < 768;
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <main className={isSmallDevice ? 'smallDevice' : ''}>
        <PlayerContainer musics={musics} hasMore={hasMore} fetchMoreDataFunction={fetchMoreData} />
      </main>
    </>
  );
}

export default compose(withRouter)(Player);
