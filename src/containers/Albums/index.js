import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import CardAlbum from '../../components/CardAlbum';

import './index.scss';

function Albums(props) {
  const { history, albums } = props;

  return (
    <div id="Albums">
      <h1 className="text-white">Albums Page</h1>
      <Container style={{ padding: '5%', textAlign: 'left' }} fluid>
        <Row>
          <Col xs={12} className="pt-6 pb-4">
            <h1 className="text-white">Les derniers albums ajoutés</h1>
          </Col>
          {albums.map((m, index) => (
            <Col xl="4" key={index} className="pb-3" onClick={() => history.push(`/player/${m.id}`)} role="button">
              <CardAlbum title={m.name} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Albums;
