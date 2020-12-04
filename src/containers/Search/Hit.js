import React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';

import './index.scss';

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  return (
    <span>
      {parsedHit.map((part, index) => (
        <div key={index}>
          {part.isHighlighted ? (
            <mark key={`mark-${index}`}>{part.value}</mark>
          ) : (
            <span key={`span-${index}`}>{part.value}</span>
          )}
        </div>
      ))}
    </span>
  );
});

const Hit = ({ hit }) => (
  <div>
    <img src={hit.image} align="left" alt={hit.name} />
    <div className="hit-name">
      <CustomHighlight attribute="name" hit={hit} />
    </div>
    <div className="hit-description">
      <CustomHighlight attribute="albumName" hit={hit} />
    </div>
    <div className="hit-description">
      <CustomHighlight attribute="author" hit={hit} />
    </div>
  </div>
);

export default Hit;
