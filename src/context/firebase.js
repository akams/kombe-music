import { createContext } from 'react';

const FirebaseContext = createContext(null);

// eslint-disable-next-line react/display-name
export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>{(firebase) => <Component {...props} firebase={firebase} />}</FirebaseContext.Consumer>
);

export default FirebaseContext;
