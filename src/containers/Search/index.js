import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import InfiniteHits from './InfiniteHits';
import CustomSearchBox from './SearchBox';

import './index.scss';

function Search(props) {
  const { searchClient } = props;
  return (
    <div id="Search">
      <h1>Test recherche music page</h1>
      <div style={{ paddingTop: '10%' }} className="ais-InstantSearch">
        <InstantSearch indexName="dev_TRACK_SEARCH" searchClient={searchClient}>
          <div>
            <Configure hitsPerPage={9} />
            <CustomSearchBox />
            <InfiniteHits minHitsPerPage={9} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default Search;
