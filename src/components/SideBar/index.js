import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { useWindowScreen } from '../../hooks';
import Nav from './Nav';
import SlideBar from './Slidebar';

import './index.scss';

function SideBar(props) {
  const { width } = useWindowScreen();
  return (
    <>
      {width < 768 && <Nav {...props} />}
      {width >= 768 && <SlideBar {...props} />}
    </>
  );
}

export default compose(withRouter)(SideBar);
