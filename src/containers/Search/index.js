import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import InfiniteHits from './InfiniteHits';
import CustomSearchBox from './SearchBox';

import './index.scss';

function Search(props) {
  const { searchClient } = props;
  return (
    <Container fluid="xl">
      <div id="Search" className="w-100">
        <Row>
          <Col xs={12} className="pt-4 pb-4">
            <h1 className="text-white">Rechercher music:</h1>
          </Col>
          <Col xs={12} className="pt-4 pb-4 ais-InstantSearch">
            <InstantSearch indexName="dev_TRACK_SEARCH" searchClient={searchClient}>
              <div>
                <Configure hitsPerPage={9} />
                <CustomSearchBox />
                <InfiniteHits minHitsPerPage={9} />
              </div>
            </InstantSearch>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Search;
