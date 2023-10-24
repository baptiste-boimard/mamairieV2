import PropTypes from 'prop-types';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  Button,
  Icon,
  Label,
  Confirm,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  deleteSelectedReport,
  eraseValueActiveIndex,
  getAdminReports,
  setActiveIndex,
} from '../../../actions/reports';

import './style.scss';

function Report({
  id_signalement,
  titre,
  created_at,
  signalement_categorie_nom,
  description,
  signalement_status_nom,
  admin_text,
}) {
  const dispatch = useDispatch();

  const { activeIndex } = useSelector((state) => state.reports);
  const { logged } = useSelector((state) => state.login);

  /** Click to open accordion
   * @setActiveIndex change state value of opening accordion
   */
  const handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    dispatch(setActiveIndex(newIndex));
  };

  /** locals state for opening confirm window */
  const [confirm, setConfirm] = useState(false);

  /** Clicking on the delete button a confirm window will open
   * @setConfirm open/close the confirm windows
   */
  const toggleDeleteConfirm = () => {
    setConfirm(!confirm);
  };

  /** Clicking on the delete button on confirm
   * @deleteSelectedReport delete request to API
   * @setConfirm close confirm window
   * @getAdminReports get request to API to get new reports list
   */
  const confirmDeleteReport = () => {
    dispatch(deleteSelectedReport(id_signalement));
    setConfirm(false);
  };

  // const confirmDeleteReport = () => setTimeout(() => {
  //   dispatch(deleteSelectedReport(id_signalement));
  //   setConfirm(false);
  //   dispatch(getAdminReports());
  // }, 2000);

  return (
    <>
      {/* Accordion list of reports */}
      <Accordion fluid styled className="report">

        {/* Accordion modele */}
        <>
          <Accordion.Title
            active={activeIndex === id_signalement}
            index={id_signalement}
            onClick={handleClickAccordion}
            className="report-title"
          >
            <div className="report-content">
              <div className="report-header">
                <Label className={signalement_categorie_nom} size="small">
                  {signalement_categorie_nom}
                </Label>
                <h3>Créé le <Moment format="DD/MM/YYYY">{created_at}</Moment></h3>
              </div>
              <span className={`report-statut report-statut--${signalement_status_nom.replace(' ', '_')}`}>{signalement_status_nom}</span>
              <h2 className="report-title">{titre}</h2>
              <div className="report-moreInfo">
                <Icon name="caret square down outline" />
                En savoir plus
              </div>
            </div>
          </Accordion.Title>

          <Accordion.Content active={activeIndex === id_signalement}>
            <Message color="grey">
              <Message.Header>Message du signalant :</Message.Header>
              <p>
                {description}
              </p>
            </Message>
            { admin_text ? (
              <Message>
                <Message.Header>Réponse de la mairie :</Message.Header>
                <p>
                  {admin_text}
                </p>
              </Message>
            ) : (
              <Message negative>
                <p>Vous n'avez pas encore traité ce signalement</p>
              </Message>
            )}
            {logged && window.location.pathname.includes('admin') && (
              <div className="report-button">
                <Link to={`/admin/reports/1/${id_signalement}`}>
                  <Button
                    className="report-button--inProgress"
                    onClick={() => { dispatch(eraseValueActiveIndex()); }}
                  >
                    Traiter le signalement
                  </Button>
                </Link>
                <Button className="report-button--delete" onClick={toggleDeleteConfirm}>Supprimer</Button>
                <Confirm
                  content="Êtes-vous sûr de vouloir supprimer ce signalement ?"
                  cancelButton="Annuler"
                  confirmButton="Supprimer"
                  open={confirm}
                  onCancel={toggleDeleteConfirm}
                  onConfirm={confirmDeleteReport}
                />
              </div>
            )}
          </Accordion.Content>
        </>
      </Accordion>
    </>
  );
}

Report.propTypes = {
  id_signalement: PropTypes.number.isRequired,
  titre: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  signalement_categorie_nom: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  signalement_status_nom: PropTypes.string.isRequired,
  admin_text: PropTypes.string,
};

Report.defaultProps = {
  admin_text: null,
};

export default Report;
