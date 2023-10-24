import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Message } from 'semantic-ui-react';

import Field from '../Field';
import Login from '../Login';
import './style.scss';

function Admin() {
  const { logged } = useSelector((state) => state.login);
  return (
    <div className="admin">
      <Login />
      { logged && (
        <>
          <h2>Votre espace administration</h2>
          <div className="admin-container">
            <div className="admin-articles admin-content">
              <div className="admin-button">
                <h3>Signalements</h3>
                <Link to="/admin/reports/1">
                  <Button className="process" icon="pencil alternate" content="Traiter" />
                </Link>
              </div>
            </div>
            <div className="admin-content">
              <div className="admin-button">
                <h3>Conseil municipal</h3>
                {/* <Button className="create" icon="plus" content="Créer" /> */}
                <Link to="/admin/council/1">
                  <Button className="editCouncil" icon="edit" content="Editer" />
                </Link>
              </div>
            </div>
            <div className="admin-content">
              <div className="admin-button">
                <h3>Articles</h3>
                <Message
                  className="inprogress-adminMessage"
                  icon="cogs"
                  content="Service bientôt disponible"
                />
                <Button className="create" icon="plus" content="Créer" />
                <Button className="edit" icon="edit" content="Editer" />
              </div>
            </div>
            <div className="admin-content">
              <div className="admin-button">
                <h3>Services</h3>
                <Message
                  className="inprogress-adminMessage"
                  icon="cogs"
                  content="Service bientôt disponible"
                />
                <Button className="create" icon="plus" content="Créer" />
                <Button className="edit" icon="edit" content="Editer" />
              </div>
            </div>

            <div className="admin-content">
              <div className="admin-button waste">
                <h3>Ramassage des ordures</h3>
                <Message
                  className="inprogress-adminMessage"
                  icon="cogs"
                  content="Service bientôt disponible"
                />
                <Button className="create" icon="plus" content="Ajouter calendrier" />
                <Button className="create" icon="plus" content="Ajouter un guide" />
              </div>
            </div>

            <div className="admin-content">
              <div className="admin-button landfill">
                <h3>Déchetterie</h3>
                <Message
                  className="inprogress-adminMessage"
                  icon="cogs"
                  content="Service bientôt disponible"
                />
                <Button className="create" icon="plus" content="Ajouter plan d'accès" />
                {/* <Button className="edit" icon="edit" content="Editer les horaires" /> */}
              </div>
            </div>
            <div className="admin-content">
              <div className="admin-button">
                <h3>Réseaux sociaux</h3>
                <Message
                  className="inprogress-adminMessage"
                  icon="cogs"
                  content="Service bientôt disponible"
                />
                <form className="admin-form">
                  <Field
                    type="text"
                    className="admin-form-input"
                    placeholder="URL facebook"
                    title="facebook"
                    icon="facebook"
                  />
                  <Button
                    type="submit"
                    className="admin-form-button"
                  >
                    Enregistrer
                  </Button>
                </form>
                <form className="admin-form">
                  <Field
                    type="text"
                    className="admin-form-input"
                    placeholder="URL twitter"
                    // value={facebook}
                    // name={facebook}
                    title="twitter"
                    icon="twitter"
                  />
                  <Button
                    type="submit"
                    className="admin-form-button"
                  >
                    Enregistrer
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
