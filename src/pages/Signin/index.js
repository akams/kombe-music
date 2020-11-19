import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { compose } from 'recompose';
import { toast } from 'react-toastify';

import { withFirebase } from '../../context/firebase';

import SigninContainer, { initFormData } from '../../containers/Signin';

function Signin(props) {
  const mainRef = useRef(null);
  const { firebase, dispatch } = props;

  const handleSubmit = async (data) => {
    const { email, password } = data;
    try {
      await firebase.login(email, password);
      toast.success('Connexion réussie');
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const initForm = (data = { email: '', password: '' }) => {
    dispatch(initFormData(data));
  };

  useEffect(() => {
    initForm();
  }, []);

  return (
    <>
      <main ref={mainRef}>
        <section className="full-page-container-center section section-shaped section-lg bg-secondary">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-6">
                      <h1>Se connecter</h1>
                      <small>Connectez-vous à votre compte pour continuer</small>
                    </div>
                    <SigninContainer originalOnSubmit={handleSubmit} {...props} />
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <Link style={{ color: 'black' }} to="/mot-de-passe-oublié">
                      <small>Mot de passe oublié?</small>
                    </Link>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Link style={{ color: 'black' }} to="/signup">
                      <small>Créer un nouveau compte</small>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export default compose(withFirebase)(Signin);
