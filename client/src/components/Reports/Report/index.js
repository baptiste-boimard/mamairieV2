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
  setActiveIndex,
} from '../../../actions/reports';

import './style.scss';

function Report({
  reporting_id,
  title,
  created_at,
  reporting_category,
  description,
  reporting_status,
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
    dispatch(deleteSelectedReport(reporting_id));
    setConfirm(false);
  };

  // const confirmDeleteReport = () => setTimeout(() => {
  //   dispatch(deleteSelectedReport(reporting_id));
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
            active={activeIndex === reporting_id}
            index={reporting_id}
            onClick={handleClickAccordion}
            className="report-title"
          >
            <div className="report-content">
              <div className="report-header">
                <Label className={reporting_category} size="small">
                  {reporting_category}
                </Label>
                <h3>Créé le <Moment format="DD/MM/YYYY">{created_at}</Moment></h3>
              </div>
              <span className={`report-statut report-statut--${reporting_status.replace(' ', '_')}`}>{reporting_status}</span>
              <h2 className="report-title">{title}</h2>
              <div className="report-moreInfo">
                <Icon name="caret square down outline" />
                En savoir plus
              </div>
            </div>
          </Accordion.Title>

          <Accordion.Content active={activeIndex === reporting_id}>
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
                <p>La mairie pas n'a pas encore traité ce signalement</p>
              </Message>
            )}
            {logged && window.location.pathname.includes('admin') && (
              <div className="report-button">
                <Link to={`/admin/reports/1/${reporting_id}`}>
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
  reporting_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  reporting_category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reporting_status: PropTypes.string.isRequired,
  admin_text: PropTypes.string,
};

Report.defaultProps = {
  admin_text: null,
};

export default Report;
