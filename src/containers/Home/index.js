import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import CardAlbum from '../../components/CardAlbum';

import './index.scss';

function Home(props) {
  const { history, albums } = props;

  return (
    <div id="Home">
      <h1 className="text-white">Home Page</h1>
      <Container style={{ padding: '5%', textAlign: 'left' }} fluid>
        <Row>
          <Col xs={12} className="pt-6 pb-4">
            <h1 className="text-white">Les derniers ajouts</h1>
          </Col>
          <Col xl="4" className="pb-3" onClick={() => history.push(`/player/all`)} role="button">
            <CardAlbum title="Tous" />
          </Col>
          {albums.map((m, index) => (
            <Col xl="4" key={index} className="pb-3" onClick={() => history.push(`/player/${m.id}`)} role="button">
              <CardAlbum title={m.name} />
            </Col>
          ))}
          <Col xl="4" className="pb-3" onClick={() => history.push(`/albums`)} role="button">
            <CardAlbum title="Voir +" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
