import {
  Button,
  Form,
  Label,
  Message,
  TextArea,
} from 'semantic-ui-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';

import {
  changeCheckboxAdminReporting,
  changeCurrentTextAreaAdminReport,
  createStateTextAreaAdminReport,
  submitModerateReporting,
} from '../../actions/reports';
import {
  setMessage,
} from '../../actions/utilities';

import './style.scss';

function ReportAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  /** filtering report admin list by report if in params */
  const report = useSelector((state) => state.reports.reportsAdminList
    .find((p) => p.reporting_id === Number(params.reporting_id)));
  const {
    message, messageColor,
  } = useSelector((state) => state.utilities);
  const { reporting_statut } = useSelector((state) => state.reports);
  const textAreaValue = useSelector((state) => state.reports[`textArea-${report.reporting_id}`]);

  /** After first page load
   * @setMessage reset error message
   * @createStateTextAreaAdminReport create a dynamic state for controlled field
   */
  useEffect(() => {
    dispatch(createStateTextAreaAdminReport(report.admin_text, `textArea-${report.reporting_id}`));
    dispatch(setMessage(''));
  }, []);

  /** Clicking on a status button
   * @changeCheckboxAdminReporting reset error message
   */
  const handleCheckbox = (event) => {
    dispatch(changeCheckboxAdminReporting(event.target.value));
  };

  /** Clicking on submit button for report treatment
   * @changeCheckboxAdminReporting reset choice of status button
   * @submitModerateReporting path request report treatment to API
   * @navigate redirect to value
   * @setMessage diplay a error message
   */
  const handleSubmit = () => {
    if (textAreaValue && reporting_statut) {
      dispatch(changeCheckboxAdminReporting(''));
      dispatch(submitModerateReporting(
        report.reporting_id,
        report.title,
        textAreaValue,
        reporting_statut,
      ));
      navigate('/admin/reports/1');
    } else if (!textAreaValue && !reporting_statut) {
      dispatch(setMessage('Vous devez donner une réponse et choisir un statut', false));
    } else if (!reporting_statut) {
      dispatch(setMessage('Vous devez choisir un statut', false));
    } else {
      dispatch(setMessage('Vous devez remplir la réponse de la mairie', false));
    }
  };

  /** Clicking on submit button for report treatment
   * @setMessage reset error message
   * @changeCheckboxAdminReporting reset choice of status button
   * @navigate redirect to value
   */
  const handleAbortProgress = () => {
    setMessage(false);
    dispatch(setMessage(''));
    dispatch(changeCheckboxAdminReporting(''));
    navigate('/admin/reports/1');
  };

  /** Controlled field
   * @changeCurrentTextAreaAdminReport change state value of textarea
   */
  const handleChange = (event) => {
    dispatch(changeCurrentTextAreaAdminReport(event.target.value, event.target.name));
  };

  return (
    <div className="reportAdmin">
      <div className="reportAdmin-date">
        <Label className={`${report.reporting_category} reportAdmin-category`}>
          {report.reporting_category}
        </Label>
        <Moment format="DD/MM/YYYY" className="reportAdmin-date">{report.created_at}</Moment>
      </div>
      <div className="reportAdmin-header">
        <div className="reportAdmin-title">
          <h2>{report.title}</h2>
          <span className={`reportAdmin-statut reportAdmin-statut--${report.reporting_statut.replace(' ', '_')}`}>{report.reporting_statut}</span>
        </div>
      </div>
      <div className="reportAdmin-info">
        <h3>Coordonnées du signalant :</h3>
        <p className="reportAdmin-firstName">Prénom : {report.first_name}</p>
        <p className="reportAdmin-lastName">Nom : {report.last_name}</p>
        <p className="reportAdmin-phone">Numéro de téléphone : {report.phonenumber}</p>
        <p value={report.email} className="reportAdmin-mail">Adresse mail : {report.email}</p>
        <p className="reportAdmin-description">Description : {report.user_text}</p>
        { report.user_image && (
          <img
            className="reportAdmin-image"
            src={report.user_image}
            alt={report.title}
          />
        )}

      </div>
      <div className="reportAdmin-info">
        <h3>Traitement du signalement :</h3>
        <Form>
          <TextArea
            type="text"
            className="reportAdmin-response"
            placeholder="Votre réponse..."
            value={textAreaValue || undefined}
            onChange={handleChange}
            title="Réponse"
            name={`textArea-${report.reporting_id}`}
          />
          <div className="reportAdmin-newStatut">
            <div className="reportAdmin-checkbox">
              <input className="inProgress" type="radio" option="statut" id="inProgress" name="reporting_statut" value="En cours" label="inProgress" onChange={handleCheckbox} />
              <label htmlFor="inProgress">
                En cours
              </label>
            </div>
            <div className="reportAdmin-checkbox">
              <input className="done" type="radio" option="statut" id="done" name="reporting_statut" value="Résolu" label="done" onChange={handleCheckbox} />
              <label htmlFor="done">
                Résolu
              </label>
            </div>
            <div className="reportAdmin-checkbox">
              <input className="abort" type="radio" option="statut" id="abort" name="reporting_statut" value="Non résolu" label="abort" onChange={handleCheckbox} />
              <label htmlFor="abort">
                Non résolu
              </label>
            </div>
          </div>
        </Form>
        { message && (
          messageColor
            ? <Message positive>  <p>{message}</p> </Message>
            : <Message negative>  <p>{message}</p> </Message>
        )}
      </div>
      <div className="reportAdmin-button">
        <Button
          type="button"
          className="reportAdmin-abort"
          onClick={handleAbortProgress}
        >Annuler
        </Button>
        <Button
          type="submit"
          className="reportAdmin-submit"
          onClick={handleSubmit}
        >Envoyer
        </Button>
      </div>
    </div>
  );
}

export default ReportAdmin;
