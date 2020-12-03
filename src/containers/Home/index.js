import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, InputGroup, Row, Col } from 'reactstrap';

import CardAlbum from '../../components/CardAlbum';

import './index.scss';

function Home(props) {
  const { history, albums } = props;
  const [title, setTitle] = useState('');

  const onChange = (event) => {
    const { value } = event.target;
    setTitle(value);
    // findArtist(value)
    //   .then((res) => {
    //     console.warn({ res });
    //   })
    //   .catch((e) => console.error(e));
  };

  return (
    <div id="Home">
      <h1 className="text-white">Home Page</h1>
      <Container style={{ padding: '5%', textAlign: 'left' }} fluid>
        <Form>
          <FormGroup>
            <InputGroup>
              <Label for="title" hidden>
                Titre
              </Label>
              <Input type="text" name="title" id="title" placeholder="Rechercher" value={title} onChange={onChange} />
            </InputGroup>
          </FormGroup>
        </Form>
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
