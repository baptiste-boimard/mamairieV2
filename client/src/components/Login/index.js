import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Message } from 'semantic-ui-react';

import Field from '../Field';
import {
  logout, submitSignup, submitLogin, toggleLogin, toggleSignup,
} from '../../actions/login';
import { setMessage } from '../../actions/utilities';

import './style.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    logged,
    isOpenSignup,
    isOpenLogin,
    activeConnectionButton,
    redirectTo,
  } = useSelector((state) => state.login);

  const {
    pseudo,
    email,
    password,
    confirmPassword,
    inseeCode,
    message,
    messageColor,
  } = useSelector((state) => state.utilities);

  /** local state to compare the both password field */
  const [samePassword, setSamePassword] = useState();

  /** After first page load
   * @setSamePassword password and confirl password have same value
   * @navigate redirect to value fo redirect
   */
  useEffect(() => {
    setSamePassword(true);
    if (redirectTo !== '') {
      navigate(redirectTo);
    }
  }, []);

  /** Clicking on connection button
   * @setMessage reset error message
   * @toggleLogin open login element
   */
  const handleToggleLogin = () => {
    dispatch(setMessage(''));
    dispatch(toggleLogin());
  };

  /** Clicking on signup button
   * @setMessage reset error message
   * @toggleSignup open signup element
   */
  const handleToggleSignup = () => {
    dispatch(setMessage(''));
    dispatch(toggleSignup());
  };

  /** Clicking on disconnect button
   * @logout disconnect user
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /** Clicking submit signup button
   * @setSamePassword change value if confirmpassword is OK
   * @submitSignup POST request to API for signup
   */
  const handleSubmitSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
      dispatch(submitSignup(pseudo, email, password, inseeCode));
    }
  };

  /** Clicking submit signup button
   * @submitLogin POST request to API for login
   */
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(submitLogin(email, password));
    dispatch(setMessage(''));
  };

  return (
    <div className="login">
      {!logged && (
      <h2>Accèder à votre espace d'administration</h2>
      )}
      {logged && (
        <div>
          <p>Vous êtes connecté à votre espace</p>
          <Button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </div>
      )}
      {!logged && (
        <Button.Group>
          <Button
            type="button"
            className="login-button"
            onClick={handleToggleSignup}
          >
            Inscription
          </Button>
          <Button.Or text="Ou" />
          <Button
            active={activeConnectionButton}
            type="button"
            className="login-button"
            onClick={handleToggleLogin}
          >
            Connexion
          </Button>
        </Button.Group>
      )}

      {(isOpenSignup && !logged) && (
        <div className="forms">
          <form className="login-form" onSubmit={handleSubmitSignup}>
            <Field
              type="text"
              className="login-input"
              placeholder="Pseudonyme"
              value={pseudo}
              name="pseudo"
              title="pseudo"
              icon="user"
            />
            <Field
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              name="email"
              title="email"
              icon="at"
            />
            <p className="login-info">exemple : john.doe@gmail.com</p>
            <Field
              type="password"
              className="login-input"
              placeholder="Mot de passe"
              value={password}
              name="password"
              title="password"
              icon="key"
              inputError={!samePassword}
            />
            <p className="login-info">Doit contenir entre 8 et 15 caractères, une majuscule et un caractère spécial (-@?!)</p>
            <Field
              error
              type="password"
              className="login-input"
              placeholder="Confirmation mot de passe"
              value={confirmPassword}
              name="confirmPassword"
              title="Confirmer password"
              icon="key"
              inputError={!samePassword}
            />
            {samePassword ? '' : <p className="red">Les mots de passe sont différents</p>}

            <Field
              type="password"
              className="login-input"
              placeholder="Code INSEE"
              value={inseeCode}
              name="inseeCode"
              title="inseeCode"
              icon="building"
            />
            <Button
              type="submit"
              className="login-form-button"
            >
              S'inscrire
            </Button>
          </form>
        </div>
      )}

      {(isOpenLogin && !logged) && (
        <div className="forms">
          <form className="login-form" onSubmit={handleSubmitLogin}>
            <Field
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              name="email"
              title="email"
              icon="at"
            />
            <Field
              type="password"
              className="login-input"
              placeholder="Mot de passe"
              value={password}
              name="password"
              title="password"
              icon="key"
            />
            <Button
              type="submit"
              className="login-form-button"
            >
              Se connecter
            </Button>
          </form>
        </div>
      )}

      { message && (
        messageColor
          ? <Message positive>  <p>{message}</p> </Message>
          : <Message negative>  <p>{message}</p> </Message>
      )}

    </div>
  );
}

export default Login;
