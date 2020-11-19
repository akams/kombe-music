import React from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Select from 'react-select';

import { withAuthorization } from '../../components/Session';

import ENV from '../../constants/environment/common.env';

const RESOURCE = 'kmUploadTracksMusic/api/v1';

const getMusicalCategories = () => axios.get(`${ENV.apiUrl}${RESOURCE}/music-categories`);
// const findArtist = value => axios.get(`${ENV.apiUrl}${RESOURCE}/findArtist=${value}`)
const findArtist = (value = 2000) =>
  new Promise(function (resolve, reject) {
    setTimeout(resolve, value);
  }).then(function () {
    console.log(`Wrapped setTimeout after ${value}ms`);
  });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      selected: null,
      musicalcategorie: [],
    };
  }

  componentDidMount() {
    this.getMusicCategories();
  }

  getMusicCategories() {
    getMusicalCategories()
      .then((resultat) => {
        const musicalcategorie = resultat.data
          .map((d) => ({
            value: d.id,
            label: d.data.label,
          }))
          .sort((a, b) => (a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1));
        this.setState({ musicalcategorie });
      })
      .catch((e) => console.error(e));
  }

  onChange = (event) => {
    const { value } = event.target;
    console.log({ value });
    this.setState({ title: event.target.value });
    findArtist(value)
      .then((res) => {
        console.warn({ res });
      })
      .catch((e) => console.error(e));
  };

  handleChangeSelect = (selected) => {
    this.setState({ selected });
  };

  render() {
    const { title, selected, musicalcategorie } = this.state;
    return (
      <div>
        <h1>Home Page + recherche</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Container style={{ padding: '5%', textAlign: 'left' }} fluid>
          <Form>
            <FormGroup>
              <InputGroup>
                <Label for="title" hidden>
                  Titre
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Rechercher"
                  value={title}
                  onChange={this.onChange}
                />
              </InputGroup>
            </FormGroup>
          </Form>
          <Row>
            {musicalcategorie &&
              musicalcategorie.map((m, index) => (
                <Col key={m.value}>
                  <Card body>
                    <Button>{m.label}</Button>
                  </Card>
                </Col>
              ))}
          </Row>
          <Row>
            <Container fluid>
              <h2>Titres</h2>
              <ListGroup>
                <ListGroupItem tag="button" action>
                  Cras justo odio
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  Dapibus ac facilisis in
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  Morbi leo risus
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  Vestibulum at eros
                </ListGroupItem>
              </ListGroup>
            </Container>
          </Row>
        </Container>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
