import React, { Component } from 'react';
import { NavLink as NavLinkRRD, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { getAuthorizationWithRoutes } from '../../services/auth.service';
import { SideMenuUl as SideMenuUlComponent, SideMenuItemLi as SideMenuItemLiComponent } from './styles';
import './styles/index.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseOpen: false,
      activeIndex: null,
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  setToggleCollapse(collapseOpen) {
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
    this.setToggleCollapse(false);
  }

  /**
   * Create links aside navigation
   * @param {*} roads
   */
  createLinks(roads) {
    const {
      location: { pathname },
      user,
    } = this.props;
    // const { activeIndex } = this.state;
    const updatedRoutes = getAuthorizationWithRoutes(user, roads);
    return updatedRoutes.map((prop, key) => (
      <NavItem key={key}>
        <NavLink
          to={prop.path}
          tag={NavLinkRRD}
          onClick={() => {
            this.closeCollapse();
            // this.toggleClass(key);
          }}
          activeClassName={prop.path === pathname ? 'active' : ''}
        >
          {prop.icon(prop.path === pathname ? 'text-primary icon-sidebar' : 'icon-sidebar')} {prop.name}
        </NavLink>
        {/* 
          <i className={`${prop.path === pathname ? `${prop.icon} text-primary` : `${prop.icon}`}`} />
            <Collapse isOpen={activeIndex === key}>
              <Sidebar.Ul>
                <Sidebar.Li className="mt-1 mb-1">Page 1</Sidebar.Li>
                <Sidebar.Li>Page 2</Sidebar.Li>
              </Sidebar.Ul>
            </Collapse>
            */}
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
              title="La Recharge Responsable"
              alt="La Recharge Responsable"
              className="navbar-brand-img"
              src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
            />
          </NavbarBrand>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <img
                    title="La Recharge Responsable"
                    alt="La Recharge Responsable"
                    className="navbar-brand-img"
                    src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
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

Sidebar.Ul = function SideMenuUl({ children, ...restProps }) {
  return <SideMenuUlComponent {...restProps}>{children}</SideMenuUlComponent>;
};
Sidebar.Li = function SideMenuItemLi({ children, ...restProps }) {
  return <SideMenuItemLiComponent {...restProps}>{children}</SideMenuItemLiComponent>;
};

const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Sidebar);
