import React, { Component } from 'react';
import { NavLink as NavLinkRRD, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './styles/index.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseOpen: false,
      activeIndex: null,
    };
    this.toggleClass = this.toggleClass.bind(this);
    this.setToggleCollapse = this.setToggleCollapse.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this);
  }

  setToggleCollapse(collapseOpen) {
    console.log({ collapseOpen });
    this.setState({ collapseOpen });
  }

  toggleClass(index) {
    const { activeIndex } = this.state;
    this.setState({
      activeIndex: activeIndex === index ? null : index,
    });
  }

  moreLess(index) {
    const { activeIndex } = this.state;
    if (activeIndex === index) {
      return (
        <span>
          <FaAngleUp />
        </span>
      );
    }
    return (
      <span>
        <FaAngleDown />
      </span>
    );
  }

  closeCollapse() {
    console.log('here closeCollapse');
    this.setToggleCollapse(false);
  }

  /**
   * Create links aside navigation
   * @param {*} roads
   */
  createLinks(roads) {
    const {
      location: { pathname },
    } = this.props;
    return roads.map((prop, key) => (
      <NavItem key={key}>
        <NavLink
          to={prop.path}
          tag={NavLinkRRD}
          onClick={() => {
            this.closeCollapse();
          }}
          activeClassName={prop.path === pathname ? 'active' : ''}
        >
          {prop.icon(prop.path === pathname ? 'text-primary icon-sidebar' : 'icon-sidebar')} {prop.name}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    const { routes } = this.props;
    const { collapseOpen } = this.state;
    return (
      <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
        <Container fluid>
          {/* Toggler */}
          <button className="navbar-toggler" type="button" onClick={() => this.setToggleCollapse(!collapseOpen)}>
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          <NavbarBrand className="pt-0">
            <img
              title="Music traditionelle gabonaise"
              alt="Music traditionelle gabonaise"
              className="navbar-brand-img"
              src=""
            />
          </NavbarBrand>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
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
                  <button className="navbar-toggler" type="button" onClick={this.closeCollapse}>
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default compose(withRouter)(Sidebar);
