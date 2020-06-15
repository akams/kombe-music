import React from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import Select from 'react-select';

import { withAuthorization } from '../../components/Session';

import ENV from '../../constants/environment/common.env';
const RESOURCE = 'kmUploadTracksMusic/api/v1';

const getMusicalCategories = () => axios.get(`${ENV.apiUrl}${RESOURCE}/music-categories`)



class Home extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      title: '',
      selected: null,
      musicalcategorie: []
    }
  }

  componentDidMount() {
    this.getMusicCategories();
  }

  getMusicCategories() {
    getMusicalCategories().then((resultat) => {
      const musicalcategorie = resultat.data.map(d => {
        return {
          value: d.id,
          label: d.data.label
        }
      }).sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1 )
      this.setState({ musicalcategorie })
    })
    .catch(e => console.error(e));
  }

  handleChangeSelect = selected => {
    this.setState({ selected });
  };

  render() {
    const { title, selected, musicalcategorie } = this.state;
    return (
      <div>
        <h1>Home Page + recherche</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Container style={{ padding: '5%', textAlign: 'left' }} fluid={true}>
          <Form>
            <FormGroup>
              <InputGroup>
                <Label for="title" hidden>Titre</Label>
                <Input type="text" name="title" id="title" placeholder="Titres | Artistes" value={title} onChange={this.onChange} />
                <InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="Gm" hidden>Genre musical</Label>
              <Select
                isMulti
                value={selected}
                onChange={this.handleChangeSelect}
                options={musicalcategorie}
                placeholder="Genre musical"
              />
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);