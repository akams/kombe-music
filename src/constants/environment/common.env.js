const env = process.env.REACT_APP_ENVIRONMENT;

const prodApi = 'https://us-central1-kombe-music.cloudfunctions.net';
const localApi = 'http://localhost:5001/kombe-music/us-central1';

const environment = {
  env: process.env,
  apiUrl: `${env === 'DEV' ? localApi : prodApi}/kombeMusicCF/api/v1`,
};

console.log('apiUrl===>', environment.apiUrl);

export default environment;
