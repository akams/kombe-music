import React from 'react';
import axios from 'axios';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization } from '../../../components/Session';
import { withFirebase } from '../../../components/Firebase';
import ENV from '../../../constants/environment/common.env';

const RESOURCE = 'kmUploadTracksMusic/api/v1';

const saveTrack = (payload) => axios.post(`${ENV.apiUrl}${RESOURCE}/save-track`, payload);
const getMusicalCategories = () => axios.get(`${ENV.apiUrl}${RESOURCE}/music-categories`);

const formToApi = (formData) => {
  console.log({ formData });
  const selected = formData.selected.map((s) => ({
    label: s.label,
  }));
  return {
    title: formData.title,
    url: formData.url,
    selected,
  };
};

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      selected: null,
      file: null,
      song: '',
      songName: '',
      username: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: '',
      musicalcategorie: [],
    };
    this.handleUpload = this.handleUpload.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
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

  handleUpload(evt) {
    // const { firebase } = this.props;
    const file = evt.target.files[0];
    console.log({ file });
    const musicRef = firebase.storage().ref(`music/${file.name}`);
    musicRef.put(file).then(() => {
      const storageRef = firebase.storage().ref('/music');

      // storageRef
      // .child(file.name)
      // .getMetadata
      // .then(metadata => console.log({metadata}))

      storageRef
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          console.log({ url });
          // this.setState({
          // 	song: url,
          // 	songName: file.name
          // })

          // let url = metaData.downloadURLs[0]
          // console.log({url})
          // const messageRef = firebase.database().ref('message')
          // messageRef.push({
          //   song: url,
          //   songName: file.name,
          // })
        });
    });
  }

  handleChange = (selected) => {
    this.setState({ selected });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeFile = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { title, selected, file } = this.state;
    const {
      user: {
        payload: { id },
      },
    } = this.props;
    const musicRef = firebase.storage().ref(`music/${id}/${file.name}`);
    musicRef
      .put(file)
      .then(() => {
        const storageRef = firebase.storage().ref(`music/${id}/`);
        storageRef
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            saveTrack(formToApi({ title, selected, url }));
          });
      })
      .catch((e) => console.error(e));
  };

  handleChangeUsername = (event) => this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = (progress) => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url }));
  };

  render() {
    const { title, selected, musicalcategorie } = this.state;
    return (
      <div>
        <h2>Upload Music</h2>

        <Container style={{ padding: '5%', textAlign: 'left' }} fluid>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="title">Titre</Label>
              <Input type="text" name="title" id="title" value={title} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Genre musical</Label>
              <Select isMulti value={selected} onChange={this.handleChange} options={musicalcategorie} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input type="file" name="file" id="exampleFile" onChange={this.onChangeFile} />
              <FormText color="muted">
                This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps
                to a new line.
              </FormText>
            </FormGroup>
            <Button type="submit">Soumettre</Button>
          </Form>
        </Container>

        {/* <div className="file-upload">
					<input
						onChange={this.handleUpload}
						name="song"
						type="file"
						placeholder="Choose an mp3"
					/>
				</div> */}

        {/* <p>Now playing: {songName}</p>

				<audio src={song} title="Noir Désir" preload="auto" controls loop>
					<p>Votre navigateur est trop ancien pour lire ce fichier</p>
				</audio> */}
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  user: state.user,
});

const condition = (authUser) => !!authUser;
const withAuth = withAuthorization(condition)(UploadFile);

export default compose(withRouter, withFirebase, connect(mapStateToProps, mapDispatchToProps))(withAuth);
