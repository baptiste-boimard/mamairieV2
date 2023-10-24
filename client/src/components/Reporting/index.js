/* eslint-disable react/jsx-no-useless-fragment */
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Checkbox, Form, Accordion, Icon, Message, Dropdown, Label,
} from 'semantic-ui-react';

import { changeCurrentCategory, changeCurrentField, setMessage } from '../../actions/utilities';
import { setActiveIndexTerms, toggleReporting } from '../../actions/reports';
import {
  submitReporting,
  changeCurrentCheckBoxReporting,
  errorReportingCategory,
  resetErrorReporting,
  errorReportingTitle,
  errorReportingDescription,
  errorReportingEmail,
  errorReportingLastname,
  errorReportingFirstname,
} from '../../actions/reporting';
import Field from '../Field';

import './style.scss';

function Reporting() {
  const dispatch = useDispatch();
  const {
    isReporting,
    activeIndexTerms,
    categoriesOptions,
  } = useSelector((state) => state.reports);
  const {
    reporting_category,
    reporting_title,
    reporting_description,
    reporting_email,
    reporting_firstName,
    reporting_lastName,
    reporting_phone,
    reporting_checkBox,
    message,
    messageColor,
  } = useSelector((state) => state.utilities);
  const {
    isReporting_categoryError,
    isReporting_titleError,
    isReporting_descriptionError,
    isReporting_emailError,
    isReporting_firstnameError,
    isReporting_lastnameError,
  } = useSelector((state) => state.reporting);

  /** Clicking on accordion
   * @setActiveIndexTerms change state value to open retail of terms
   */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndexTerms === index ? -1 : index;
    dispatch(setActiveIndexTerms(newIndex));
  };

  /** Clicking on submit buttton of reporting form
   * @resetErrorReporting reset error of empty field of reporting
   * @submitReporting submit form to a post request to API
   * @setMessage set value to error message
   * @errorReportingCategory set error status to true
   * @errorReportingTitle set error status to true
   * @errorReportingDescription set error status to true
   * @errorReportingEmail set error status to true
   * @errorReportingLastname set error status to true
   * @errorReportingFirstname set error status to true
   */
  const handleSubmit = () => {
    dispatch(resetErrorReporting());
    if (reporting_checkBox
      && reporting_category !== ''
      && reporting_category !== 'Catégories'
      && reporting_title !== ''
      && reporting_description !== ''
      && reporting_email !== ''
      && reporting_firstName !== ''
      && reporting_lastName !== ''
    ) {
      dispatch(submitReporting(
        reporting_category,
        reporting_title,
        reporting_description,
        reporting_email,
        reporting_firstName,
        reporting_lastName,
        reporting_phone,
      ));
    } else if (!reporting_checkBox) {
      dispatch(setMessage('Vous devez accepter les termes et conditions pour pouvoir signaler un événement', false));
    } else {
      dispatch(setMessage('Vous devez compléter les champs obligatoires', false));

      if (reporting_category === '' || reporting_category === 'Catégories') {
        dispatch(errorReportingCategory());
      }
      if (reporting_title === '') {
        dispatch(errorReportingTitle());
      }
      if (reporting_description === '') {
        dispatch(errorReportingDescription());
      }
      if (reporting_email === '') {
        dispatch(errorReportingEmail());
      }
      if (reporting_lastName === '') {
        dispatch(errorReportingLastname());
      }
      if (reporting_firstName === '') {
        dispatch(errorReportingFirstname());
      }
    }
  };

  /** Clicking on cancel reporting element
   * @toggleReporting close reporting element
   * @setMessage reset error message
   */
  const handleClickBack = () => {
    dispatch(toggleReporting(false));
    dispatch(setMessage(''));
  };

  /** Clicking dropdown category
   * @changeCurrentCategory change state value for conrolled field
   */
  const handleChangeCategory = (event) => {
    dispatch(changeCurrentCategory(event.target.textContent));
  };

  /** Change text on textarea description
   * @changeCurrentField change state value for conrolled field
   */
  const handleChangeDescription = (event) => {
    dispatch(changeCurrentField(event.target.value, event.target.name));
  };

  /** Change value of checkbox
   * @changeCurrentCheckBoxReporting change state value for conrolled field
   */
  const handleCheckBox = () => {
    dispatch(changeCurrentCheckBoxReporting());
  };

  return (
    <>
      {isReporting && (
      <section className="reporting">
        <h2>Signaler un événement</h2>
        <Form className="reporting-form">
          <section className="filter-section">
            <Dropdown
              className="filter-dropdown categories"
              placeholder="Catégories *"
              fluid
              selection
              options={categoriesOptions}
              onChange={handleChangeCategory}
            />
          </section>
          {isReporting_categoryError && (
          <Label basic pointing>
            Champ à compléter SVP
          </Label>
          )}
          <Field
            type="text"
            className="reporting-title"
            placeholder="Titre *"
            value={reporting_title}
            title="Titre"
            name="reporting_title"
            icon="comment alternate"
          />
          {isReporting_titleError && (
            <Label basic pointing>
              Champ à compléter SVP
            </Label>
          )}
          <Form.TextArea
            value={reporting_description}
            title="Description"
            name="reporting_description"
            className="reporting-form-textarea"
            placeholder="Description : Que souhaitez vous signaler ? *"
            onChange={handleChangeDescription}
          />
          {isReporting_descriptionError && (
            <Label basic pointing>
              Champ à compléter SVP
            </Label>
          )}
          <Field
            type="email"
            className="reporting-email"
            placeholder="Email *"
            value={reporting_email}
            title="Email"
            name="reporting_email"
            icon="at"
          />
          {isReporting_emailError && (
            <Label basic pointing>
              Champ à compléter SVP
            </Label>
          )}
          <Field
            type="text"
            className="reporting-firstname"
            placeholder="Prénom *"
            value={reporting_firstName}
            name="reporting_firstName"
            title="Prénom"
            icon="user"
          />
          {isReporting_firstnameError && (
            <Label basic pointing>
              Champ à compléter SVP
            </Label>
          )}
          <Field
            type="text"
            className="reporting-lastname"
            placeholder="Nom *"
            value={reporting_lastName}
            name="reporting_lastName"
            title="Nom"
            icon="user"
          />
          {isReporting_lastnameError && (
            <Label basic pointing>
              Champ à compléter SVP
            </Label>
          )}
          <Field
            type="tel"
            className="reporting-phone"
            placeholder="Téléphone"
            value={reporting_phone}
            title="Téléphone"
            name="reporting_phone"
            icon="phone"
          />
          <p className="obligateFields">*  Champs obligatoires</p>
          <Form.Field className="reporting-form-checkbox">
            <Checkbox
              label="J'accepte les termes et conditions"
              name="reporting_checkBox"
              title="Accepter les conditions"
              checked={reporting_checkBox}
              onChange={handleCheckBox}
            />
            <Accordion>
              <Accordion.Title
                active={activeIndexTerms === 0}
                index={0}
                onClick={handleClick}
              >
                <div className="retail-container">
                  <p>Détails</p>
                  <Icon name="dropdown" />
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndexTerms === 0}>

                <Message
                  content="En acceptant les termes et les conditions de ce formulaire, j'autorise
                mamairie.fr à stocker mon adresse IP durant 30 jours, afin que mamairie.fr puisse se prémunir en cas d'événement pouvant compromettre la sécurité du site."
                />
              </Accordion.Content>
            </Accordion>
          </Form.Field>
          <Form.Field className="button-validation">
            <Button
              type="submit"
              className="form-submit"
              onClick={handleSubmit}
            >Envoyer
            </Button>
            <Button
              type="button"
              className="form-back"
              onClick={handleClickBack}
            >Retour
            </Button>
          </Form.Field>
        </Form>
        <div className="message-container">
          {message && (
            messageColor
              ? <Message className="reports-message" positive>  <p>{message}</p> </Message>
              : <Message className="reports-message" negative>  <p>{message}</p> </Message>
          )}
        </div>
      </section>
      )}
    </>
  );
}

export default Reporting;
