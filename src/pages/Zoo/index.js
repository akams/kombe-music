/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Chance from 'chance';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectHighlight } from 'react-instantsearch-dom';

import { withFirebase } from '../../context/firebase';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

function Zoo(props) {
  const { firebase } = props;
  const addAnimal = async () => {
    try {
      const chance = new Chance();
      const animal = {
        name: chance.animal({ type: 'zoo' }),
        bio: chance.paragraph(),
        gender: chance.gender(),
      };
      console.log(JSON.stringify(animal));
      const ref = firebase.firestore.collection('zoo');
      await ref.add(animal);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAnimal = async ({ objectID }) => {
    try {
      console.log('delete', { objectID });
      const ref = firebase.firestore.collection('zoo');
      await ref.doc(objectID).delete();
    } catch (error) {
      console.error(error);
    }
  };

  const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      highlightProperty: '_highlightResult',
      attribute,
      hit,
    });
    console.log({ hit });
    console.log({ parsedHit });
    return (
      <span>
        {parsedHit.map((part, index) => (
          <div>
            {part.isHighlighted ? <mark key={index}>{part.value}</mark> : <span key={index}>{part.value}</span>}
            <button key={`b-${index}`} type="button" onClick={() => deleteAnimal(hit)}>
              delete animal
            </button>
          </div>
        ))}
      </span>
    );
  });

  const Hit = ({ hit }) => (
    <p>
      <CustomHighlight attribute="name" hit={hit} />
    </p>
  );

  return (
    <div>
      <h1>Test zoo page</h1>
      <div>
        <button type="button" onClick={() => addAnimal()}>
          Add animal
        </button>
      </div>
      <div style={{ paddingTop: '10%' }}>
        <InstantSearch indexName="dev_ZOO_SEARCH" searchClient={searchClient}>
          <div>
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default compose(withFirebase, withRouter)(Zoo);
