/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import algoliasearch from 'algoliasearch/lite';

import SearchContainer from '../../containers/Search';
import SideBar from '../../components/SideBar';

import { withFirebase } from '../../context/firebase';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

function Search(props) {
  const { IN_APP_ROUTES } = props;
  console.log({ IN_APP_ROUTES });
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content">
        <SearchContainer searchClient={searchClient} {...props} />
      </div>
    </>
  );
}

export default compose(withFirebase, withRouter)(Search);
