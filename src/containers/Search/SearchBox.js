import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FaSearch } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { Form, FormGroup, InputGroupAddon, InputGroupText, Input, InputGroup } from 'reactstrap';

const SearchBox = ({ currentRefinement, refine }) => (
  <Form
    noValidate
    role="search"
    className="navbar-search navbar-search-dark form-inline mr-3 d-md-flex ml-lg-auto pb-5"
  >
    <FormGroup className="mb-0 w-100">
      <InputGroup className="input-group-alternative w-100">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          type="search"
          placeholder="Search"
          className="searchForm"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <ImCancelCircle className="cursorPointer" onClick={() => refine('')} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  </Form>
);
const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
