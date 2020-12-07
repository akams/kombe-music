import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlayerContainer from '../../containers/Player';

import ENV from '../../constants/environment/common.env';

const getMusics = (payload) => axios.get(`${ENV.apiUrl}/get-musics`, payload);

function Player() {
  const [musics, setMusics] = useState([]);
  const [lastDocument, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  // query param
  const { idAlbum } = useParams();

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

  useEffect(() => {
    async function fetch() {
      await fetchData();
    }
    fetch();
  }, []);
  return <PlayerContainer musics={musics} hasMore={hasMore} fetchMoreDataFunction={fetchMoreData} />;
}

export default Player;
