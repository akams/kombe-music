import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../context/firebase';
import './styles.scss';

function AdminNavbar(props) {
  const {
    brandText,
    firebase,
    user: { firstname, lastname },
  } = props;

  const logout = async () => {
    await firebase.logout();
  };
  return (
    <>
      <Navbar className="navbar-top navbar-dark bg-gradient-green" expand="md" id="navbar-main">
        <Container fluid>
          <Link className="h4 mb-0 text-white text-uppercase d-none d-md-inline-block" to="/">
            {brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">{`${firstname} ${lastname}`}</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Deconnexion</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(AdminNavbar);
