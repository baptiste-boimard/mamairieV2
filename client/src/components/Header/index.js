import { Link } from 'react-router-dom';

import photo from '../../assets/images/logo2.png';
// import logo from '../../assets/images/favicon-64.png';

import './style.scss';

function Header() {
  return (
    <header className="header">
      <Link className="header-link" to="/">
        <img src={photo} className="header-photo" alt="Mairie" />
      </Link>
    </header>
  );
}

export default Header;
