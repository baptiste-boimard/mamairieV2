import { Button } from 'semantic-ui-react';

import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-infos">
          <h2 className="report-title">Informations de la mairie</h2>
          <p>Adresse de la mairie :<br />
            14 rue de la République<br />
            27000 MairieVille
          </p>
          <p>Téléphone : 01 02 03 04 05</p>
          <p>Email : mairie@mairie.fr</p>
        </div>
        <div className="footer-rightContent">
          <div className="footer-hourly">
            <h2>Horaires de la mairie</h2>
            <p>Du lundi au mardi de 9h à 12h<br />
              Puis du jeudi au vendredi de 14h à 17h
            </p>
            <div className="footer-followUs">
              <h2>Suivez-nous</h2>
              <div className="footer-followUs-icons">
                <Button circular color="facebook" icon="facebook" />
                <Button circular color="twitter" icon="twitter" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© mamairie.fr @2022</div>
    </div>
  );
}

export default Footer;
