import React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';
import { Badge, Col, Row } from 'reactstrap';

import './index.scss';

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  let badge = null;
  if (attribute === 'author') {
    badge = (
      <span>
        <Badge color="secondary">Autheur</Badge> -
      </span>
    );
  }
  const styles = {
    fontSize: '1rem',
  };
  return (
    <span>
      {parsedHit.map((part, index) => (
        <div key={index}>
          {part.isHighlighted ? (
            <mark key={`mark-${index}`} style={styles}>
              {badge} {part.value}
            </mark>
          ) : (
            <span key={`span-${index}`} style={styles}>
              {badge} {part.value}
            </span>
          )}
        </div>
      ))}
    </span>
  );
});

const Hit = ({ hit }) => (
  <Row>
    <Col xs={4}>
      <img src={hit.image} align="left" alt={hit.name} />
    </Col>
    <Col>
      <div className="hit-name">
        <CustomHighlight attribute="name" hit={hit} />
      </div>
      <div className="hit-description">
        <CustomHighlight attribute="author" hit={hit} />
      </div>
    </Col>
  </Row>
);

export default Hit;
