import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import CardAlbum from '../../components/CardAlbum';

import './index.scss';

function Albums(props) {
  const { history, albums = [] } = props;

  return (
    <Container fluid>
      <div id="Albums" className="w-100">
        <Row>
          <Col xs={12} className="pt-4 pb-4">
            <h1 className="text-white">Albums Page</h1>
          </Col>
          <Col xs={12} className="pt-4 pb-4">
            <h2 className="text-white">Les derniers albums ajoutés</h2>
          </Col>
          {albums.map((m, index) => (
            <Col xl="4" key={index} className="pb-3" onClick={() => history.push(`/player/${m.id}`)} role="button">
              <CardAlbum title={m.name} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Albums;
