import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';

import SearchContainer from '../../containers/Search';
import SideBar from '../../components/SideBar';

import { withFirebase } from '../../context/firebase';
import { useWindowScreen } from '../../hooks';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

function Search(props) {
  const { IN_APP_ROUTES } = props;
  const { width: widthScreen } = useWindowScreen();
  const isSmallDevice = widthScreen < 768;
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <main className={isSmallDevice ? 'smallDevice' : ''}>
        <SearchContainer searchClient={searchClient} {...props} />
      </main>
    </>
  );
}

export default compose(withFirebase, withRouter)(Search);
