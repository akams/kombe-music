import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
    this.analytics = firebase.analytics();
  }

  // *** Auth API ***

  register(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  sendEmailVerification() {
    const user = this.auth.currentUser;
    if (!user.emailVerified) {
      return user.sendEmailVerification();
    }
    return Promise.resolve({ warning: 'un e-mail a déjà été envoyer' });
  }

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
