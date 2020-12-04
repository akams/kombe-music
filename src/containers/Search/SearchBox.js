import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, refine }) => (
  <form noValidate action="" role="search">
    <input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} />
    <button type="button" onClick={() => refine('')}>
      Reset query
    </button>
  </form>
);
const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
