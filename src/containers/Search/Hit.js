import React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';
import { Badge, Col, Row } from 'reactstrap';

import { useWindowScreen } from '../../hooks';

import './index.scss';

import junglePicture from '../../assets/images/default/jungle-0.jpg';

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
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={`mark-${index}`} style={styles}>
            {badge} {part.value}
          </mark>
        ) : (
          <span key={`span-${index}`} style={styles}>
            {badge} {part.value}
          </span>
        )
      )}
    </span>
  );
});

const Hit = ({ hit }) => {
  const img = hit.imgUrl ? hit.imgUrl : junglePicture;
  const { width } = useWindowScreen();
  let colSize = 2;
  if (width <= 768 && width > 425) {
    colSize = 3;
  } else if (width <= 425 && width > 375) {
    colSize = 4;
  } else if (width <= 375) {
    colSize = 5;
  }
  return (
    <Row>
      <Col xs={colSize}>
        <img width={100} height={100} src={img} align="left" alt={hit.name} />
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
};

export default Hit;
