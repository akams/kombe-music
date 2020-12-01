import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function CardAlbum({ title = '', classNameCard = 'card-stats mb-4 mb-xl-0' }) {
  return (
    <Card className={classNameCard}>
      <CardBody className="text-center">
        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
          {title}
        </CardTitle>
      </CardBody>
    </Card>
  );
}

export default CardAlbum;
