import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import { NavLink as NavLinkRRD } from 'react-router-dom';

function CustomNav(props) {
  const {
    location: { pathname },
    IN_APP_ROUTES,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const createLinks = (roads) =>
    roads.map((prop, key) => (
      <NavItem key={key}>
        <NavLink
          to={prop.path}
          tag={NavLinkRRD}
          onClick={setIsOpen}
          activeClassName={prop.path === pathname ? 'active' : ''}
        >
          {prop.icon(prop.path === pathname ? 'text-primary icon-sidebar' : 'icon-sidebar')} {prop.name}
        </NavLink>
      </NavItem>
    ));

  return (
    <Navbar color="light" light expand="md">
      <Container fluid>
        <NavbarBrand href="/">Kombe-Music</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <img
                  title="Music traditionelle gabonaise"
                  alt="Music traditionelle gabonaise"
                  className="navbar-brand-img"
                  src=""
                />
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggle}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          <Nav className="mr-auto" navbar>
            {createLinks(IN_APP_ROUTES)}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNav;
