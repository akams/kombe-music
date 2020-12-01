import React from 'react';
import { compose } from 'recompose';
import HomeContainer from '../../containers/Home';

import { withFirebase } from '../../context/firebase';

function Home() {
  return <HomeContainer />;
}

export default compose(withFirebase)(Home);
