import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Message } from 'semantic-ui-react';

import './style.scss';

function NotFound() {
  const navigate = useNavigate();

  const { logged } = useSelector((state) => state.login);

  /** Admin page no found
   * @navigate redirect to path
  */
  const redirectToLogin = () => {
    navigate('/admin');
  };

  /** page no found
   * @navigate redirect to path
  */
  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound">
      { (window.location.pathname.includes('admin') && !logged) ? (
        <div className="notfound-container">
          <Message negative className="notfound-message">
            Vous devez être connecté pour accèder à cette page
          </Message>
          <Button onClick={redirectToLogin} className="notfound-button">
            Se connecter
          </Button>
        </div>
      ) : (
        <div className="notfound-container">
          <Message className="notfound-message">
            <Message.Header>
              Erreur 404
            </Message.Header>
            <p>
              La page que vous recherchez semble introuvable
            </p>
          </Message>
          <Button onClick={redirectToHome} className="notfound-button">
            Retour à l'accueil
          </Button>
        </div>
      ) }
    </div>
  );
}

export default NotFound;
