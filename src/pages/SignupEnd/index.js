import React, { useRef, useEffect } from 'react';
import { compose } from 'recompose';
import { Card, CardBody, Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { GoSignIn } from 'react-icons/go';
import { withFirebase } from '../../context/firebase';

function SignupEnd(props) {
  const { firebase, history } = props;
  const mainContent = useRef(null);
  const redirectToSignIn = async () => {
    await firebase.logout();
    history.push('/signin');
  };
  useEffect(() => {
    async function fetch() {
      try {
        await firebase.sendEmailVerification();
      } catch (e) {
        console.error({ e });
      }
    }
    fetch();
  }, []);
  return (
    <>
      <main ref={mainContent}>
        <section className="full-page-container-center section section-shaped section-lg bg-secondary">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center mb-4">
                      <img
                        width={100}
                        title="La Recharge Responsable"
                        alt="La Recharge Responsable"
                        className="navbar-brand-img"
                        src="https://waat.fr/wp-content/uploads/2018/05/logo-waat-v10-rvb.svg"
                      />
                    </div>
                    <div className="text-center text-muted mb-6">
                      <h1>Finalisation de l'inscription</h1>
                    </div>
                    <p>Merci de votre inscription, vous allez recevoir un e-mail de confirmation à votre adresse.</p>
                    <p>A tout de suite!</p>
                    <div className="text-center text-muted mb-6">
                      <Button color="primary" size="lg" onClick={() => redirectToSignIn()}>
                        <GoSignIn /> Revenir sur l'écran de connexion
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export default compose(withRouter, withFirebase)(SignupEnd);
