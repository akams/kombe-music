import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  img: {
    background: 'url(../assets/img/pexels-tom-verdoot-3444649.jpg) no-repeat center center fixed',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
  sizeOne: {
    fontSize: '5rem',
  },
  sizeTwo: {
    fontSize: '3rem',
  },
  sizeDefault: {
    fontSize: '2rem',
  },
  myBtn: {
    zIndex: 1,
    overflow: 'hidden',
    background: 'transparent',
    position: 'relative',
    padding: '8px 50px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '1em',
    letterSpacing: '2px',
    transition: '0.2s ease',
    fontWeight: 'bold',
    margin: '5px 0px',
    border: '1px solid',
  },
};

function NotFound() {
  return (
    <div style={styles.img}>
      <div className="text-center text-white pt-8">
        <h1 className="text-white" style={styles.sizeOne}>
          404
        </h1>
        <h2 className="text-white" style={styles.sizeTwo}>
          UH OH! Tu es perdu.
        </h2>
        <p className="text-white" style={styles.sizeDefault}>
          La page que vous recherchez n'existe pas. Comment vous êtes arrivé ici est un mystère. Mais vous pouvez
          cliquer sur le bouton ci-dessous pour revenir à la page d'accueil.
        </p>
        <p className="text-center" style={styles.sizeDefault}>
          <Link to="/" className="text-white" style={styles.myBtn}>
            Page d'accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
