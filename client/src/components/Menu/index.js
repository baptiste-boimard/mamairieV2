import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { useEffect, useRef } from 'react';

import { toggleMenu } from '../../actions/menu';
import { setMessage } from '../../actions/utilities';
import { resetErrorReporting } from '../../actions/reporting';
import { eraseValueActiveIndex, toggleReporting } from '../../actions/reports';

import './style.scss';

function Menu() {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.menu);

  // const messagesRef = useRef();

  // const hiddenElementRef = useRef();

  // useEffect(() => {
  //   hiddenElementRef.current.scrollIntoView({ behavior: 'smooth' });
  // }, [isOpen]);

  /** Clicking one button of menu
   * @toggleMenu close menu
   * @toggleReporting close reporting element
  */
  const hideMenu = () => {
    dispatch(toggleMenu(false));
    dispatch(toggleReporting(false));
  };

  /** Clicking menu button
   * @toggleMenu open menu
   * @setMessage reset error message
   * @resetErrorReporting reset errors on reporting field
   * @eraseValueActiveIndex close every report accordion
   */
  const handleToggle = () => {
    dispatch(toggleMenu());
    dispatch(setMessage(''));
    dispatch(resetErrorReporting());
    dispatch(eraseValueActiveIndex());
  };

  return (
  // <div className={isOpen ? 'test test--open' : 'test'}>
    <div className="menu">
      <div className="menu-content">
        <Link to="/">
          <h1 className="menu-title">Mairie d'Apothéose sur O'Clock</h1>
        </Link>
        <Button className={isOpen ? 'menu-button menu-button--open' : 'menu-button'} icon="sidebar" onClick={handleToggle} />
      </div>
      { isOpen && (
        <nav className="menu-list">
          <NavLink className="menu-item" to="/articles/1" onClick={hideMenu}>
            <Button className="article">
              <section className="buttonMenu-container">
                <Icon name="newspaper outline" />
                <p>Articles</p>
              </section>
            </Button>
          </NavLink>
          <NavLink className="menu-item" to="/reports/1" onClick={hideMenu}>
            <Button className="warning" onClick={() => dispatch(eraseValueActiveIndex())}>
              <section className="buttonMenu-container">
                <Icon name="warning sign" />
                <p>Signaler</p>
              </section>
            </Button>
          </NavLink>
          <NavLink className="menu-item" to="/council/1" onClick={hideMenu}>
            <Button className="council">
              <section className="buttonMenu-container">
                <Icon className="council" name="building outline" />
                <p>Conseil Municipal</p>
              </section>
            </Button>
          </NavLink>
          <NavLink className="menu-item" to="/school/1" onClick={hideMenu}>
            <Button className="school">
              <section className="buttonMenu-container">
                <Icon name="student" />
                <p>Ecole</p>
              </section>
            </Button>
          </NavLink>
          <NavLink className="menu-item" to="/" onClick={hideMenu}>
            <Button className="homepage">
              <section className="buttonMenu-container">
                <Icon name="home" />
                <p>Accueil</p>
              </section>
            </Button>
          </NavLink>
          <NavLink className="menu-item" to="/admin" onClick={hideMenu}>
            <Button className="admin">
              <section className="buttonMenu-container">
                <Icon name="sign-in" />
                <p>Administration</p>
              </section>
            </Button>
          </NavLink>
        </nav>
      )}
    </div>
  // </div>
  );
}

export default Menu;
