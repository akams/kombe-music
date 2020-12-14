import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import axios from 'axios';
import { useParams, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SideBar from '../../components/SideBar';

import { withFirebase } from '../../context/firebase';
import { useWindowScreen } from '../../hooks';

import ENV from '../../constants/environment/common.env';

import junglePicture from '../../assets/images/default/jungle-0.jpg';

const getMusic = (payload) => axios.get(`${ENV.apiUrl}/get-albums-by-author`, payload);

function Author(props) {
  const { IN_APP_ROUTES, history } = props;
  const { width: widthScreen } = useWindowScreen();
  const isSmallDevice = widthScreen < 768;

  const [albums, setAlbums] = useState([
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
    { id: 'A4fKeuQZGttsBlt8cxxR', name: 'AGNOYI MA GOTAMBO' },
  ]);
  // const [lastDocument, setLastVisible] = useState(null);
  // const [hasMore, setHasMore] = useState(true);

  const { author } = useParams();

  const fetchData = async (param) => {
    const res = await getMusic(param);
    const datas = res.data;
    console.log({ datas });
    // setAlbums(datas);
    // setLastVisible(last);
  };

  useEffect(() => {
    async function fetch() {
      const param = { params: { author } };
      await fetchData(param);
    }
    fetch();
  }, []);

  const { width } = useWindowScreen();
  let colSize = 2;
  if (width <= 768 && width > 425) {
    colSize = 3;
  } else if (width <= 425 && width > 375) {
    colSize = 4;
  } else if (width <= 375) {
    colSize = 5;
  }
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <main className={isSmallDevice ? 'smallDevice' : ''}>
        <h1>test hello author</h1>
        <h2>Les derniers albums</h2>
        <Row>
          {albums.map((album, id) => {
            const img = album.imgUrl ? album.imgUrl : junglePicture;
            return (
              <Col xs={3} className="pb-3" key={id} role="button">
                <img width={100} height={100} src={img} align="left" alt={album.name} />
                <div className="hit-name">{album.name}</div>
              </Col>
            );
          })}
        </Row>
      </main>
    </>
  );
}

export default compose(withFirebase, withRouter)(Author);
