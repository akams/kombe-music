import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import CardAlbum from '../../components/CardAlbum';
import ENV from '../../constants/environment/common.env';

const getAlbums = () => axios.get(`${ENV.localApiUrl}/get-albums`);
// const findArtist = value => axios.get(`${ENV.apiUrl}${RESOURCE}/findArtist=${value}`)
const findArtist = (value = 2000) =>
  new Promise(function (resolve, reject) {
    setTimeout(resolve, value);
  }).then(function () {
    console.log(`Wrapped setTimeout after ${value}ms`);
  });

function Home(props) {
  const { history } = props;
  const [title, setTitle] = useState('');
  const [musicalcategorie, setMusicalCategorie] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getAlbums();
      setMusicalCategorie(res.data);
    }
    fetch();
  }, []);

  const onChange = (event) => {
    const { value } = event.target;
    setTitle(event.target.value);
    // findArtist(value)
    //   .then((res) => {
    //     console.warn({ res });
    //   })
    //   .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>Home Page + recherche</h1>
      <p>The Home Page is accessible by every user.</p>
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
            <h1>Les derniers ajouts</h1>
          </Col>
          <Col xl="4" className="pb-3" onClick={() => history.push(`/player/all`)} role="button">
            <CardAlbum title="Tous" />
          </Col>
          {musicalcategorie.map((m, index) => (
            <Col xl="4" key={index} className="pb-3" onClick={() => history.push(`/player/${m.id}`)} role="button">
              <CardAlbum title={m.name} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default compose(withRouter)(Home);
