import React from 'react';
import axios from 'axios';
import * as firebase from 'firebase'
import FileUploader from "react-firebase-file-uploader";
import Select from 'react-select';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap';

import { withAuthorization } from '../../../components/Session';
import { withFirebase } from '../../../components/Firebase'
import ENV from '../../../constants/environment/common.env';

const RESOURCE = 'kmUploadTracksMusic/api/v1';
const requestPostTrack = (payload, config) => axios({
  url: `${ENV.apiUrl}${RESOURCE}/upload-track`,
  method: 'POST',
  data: payload,
  config
})

class UploadFile extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      title: '',
      selectedOption: null,
      file: null,
      song: '',
	    songName: '',
			username: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    }
    this.handleUpload = this.handleUpload.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
  }

	handleUpload(evt) {
		// const { firebase } = this.props;
		let file = evt.target.files[0]
		console.log({file})
		let musicRef = firebase.storage().ref('music/' + file.name)
    musicRef.put(file).then(() => {
			const storageRef = firebase.storage().ref('/music')
			
			// storageRef
			// .child(file.name)
			// .getMetadata
			// .then(metadata => console.log({metadata}))

      storageRef
        .child(file.name)
        .getDownloadURL()
        .then(url => {
					console.log({url})
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
				})
    })
  }
  
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  onChangeFile = event => {
    this.setState({ [event.target.name]: event.target.files });
  };

  onSubmit = event => {
    event.preventDefault();
    const { title, selectedOption, file } = this.state;
    console.log({title, selectedOption, file})
    console.log('this.props==========>>>>', this.props);

    // const formData = new FormData();
    // formData.append('title',title)
    // formData.append('selectedOption',selectedOption)
    // formData.append('file',file)

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Accept": "application/json",
    //     "type": "formData"
    //   }
    // }
    // requestPostTrack(formData, config)
  }

	handleChangeUsername = event =>
  this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

	render() {
		const { title, selectedOption } = this.state;
		return (
			<div>
				<h2>Upload an MP3 below!</h2>

        <Container style={{padding: '5%', textAlign: 'left'}} fluid={true}>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="title">Titre</Label>
              <Input type="text" name="title" id="title" value={title} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Genre musical</Label>
              <Select
                isMulti
                value={selectedOption}
                onChange={this.handleChange}
                options={[
                  { value: 'chocolate', label: 'Chocolate' },
                  { value: 'strawberry', label: 'Strawberry' },
                  { value: 'vanilla', label: 'Vanilla' },
                ]}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input type="file" name="file" id="exampleFile" onChange={this.onChangeFile} />
              <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
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



const condition = authUser => !!authUser;
const withAuth = withAuthorization(condition)(UploadFile)

export default withFirebase(withAuth);