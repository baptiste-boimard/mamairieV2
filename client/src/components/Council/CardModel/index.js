import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Image,
  Icon,
  Button,
  Confirm,
  Modal,
} from 'semantic-ui-react';

import {
  createEditingMember,
  createEditingMemberFirstName,
  createEditingMemberLastName,
  createEditingMemberPhoto,
  createEditingMemberRole,
  deleteCouncilMembers,
  patchCouncilMembers,
  toggleEditingMember,
} from '../../../actions/council';
import Field from '../../Field';

function CardModel({ ...card }) {
  const dispatch = useDispatch();

  const adminLogged = useSelector((state) => state.login.logged);
  const isOpenModal = useSelector((state) => state.council[`isOpenModalMember-${card.id_personnel_mairie}`]);
  const lastNameValue = useSelector((state) => state.utilities[`lastNameMember-${card.id_personnel_mairie}`]);
  const firstNameValue = useSelector((state) => state.utilities[`firstNameMember-${card.id_personnel_mairie}`]);
  const roleValue = useSelector((state) => state.utilities[`roleMember-${card.id_personnel_mairie}`]);
  const photoValue = useSelector((state) => state.utilities[`photoMember-${card.id_personnel_mairie}`]);

  /** Confirm component state to delete a card member */
  const [confirm, setConfirm] = useState(false);

  /** Opening confirm element
   * @setConfirm change value of confirm local state
   */
  const toggleDeleteConfirm = () => {
    setConfirm(!confirm);
  };

  /**
   *  Trigger opening editing member
   *  @toggleEditingMember open modal corresponding at id member staff
   */
  const handleClick = () => {
    dispatch(toggleEditingMember(`isOpenModalMember-${card.id_personnel_mairie}`));
  };

  /** Click delete button
   * @deleteCouncilMembers delete request to API
   */
  const confirmDeleteClick = (event) => {
    const id = event.target.closest('.dimmable').querySelector(`.card-${card.id_personnel_mairie}`).getAttribute('name');
    dispatch(deleteCouncilMembers(id));
  };

  /** Click on submit editing council member
   * @toggleEditingMember close editing modal
   * @patchCouncilMembers send patch member council to API
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.closest('.dimmable').querySelector(`.card-${card.id_personnel_mairie}`).getAttribute('name');
    dispatch(toggleEditingMember(`isOpenModalMember-${card.id_personnel_mairie}`));
    dispatch(patchCouncilMembers(photoValue, firstNameValue, lastNameValue, roleValue, id));
  };

  /** After first page load
   * @createEditingMember create a dynamic state value for one member
   * @createEditingMemberLastName create a dynamic state value for one member for controlled field
   * @createEditingMemberFirstName create a dynamic state value for one member for controlled field
   * @createEditingMemberRole create a dynamic state value for one member for controlled field
   * @createEditingMemberPhoto create a dynamic state value for one member for controlled field
   */
  useEffect(() => {
    dispatch(createEditingMember(`isOpenModalMember-${card.id_personnel_mairie}`));
    dispatch(createEditingMemberLastName(card.nom, `lastNameMember-${card.id_personnel_mairie}`));
    dispatch(createEditingMemberFirstName(card.prenom, `firstNameMember-${card.id_personnel_mairie}`));
    dispatch(createEditingMemberRole(card.role, `roleMember-${card.id_personnel_mairie}`));
    dispatch(createEditingMemberPhoto(card.photo, `photoMember-${card.id_personnel_mairie}`));
  }, []);

  return (
    <Card className={`card-${card.id_personnel_mairie}`} name={card.id_personnel_mairie}>

      {isOpenModal && (
      <Modal
        className="modalEditingCouncilMember"
        onClose={handleClick}
        onOpen={handleClick}
        open
      >
        <Modal.Header>Editer ce membre</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={photoValue} wrapped />
          <div className="modal-inputs">
            <Field
              type="text"
              icon="picture"
              iconPosition="left"
              value={photoValue}
              name={`photoMember-${card.id_personnel_mairie}`}
              placeholder="URL de la photo"
              title="Photo"
            />
            <Field
              type="text"
              icon="user"
              iconPosition="left"
              value={firstNameValue}
              name={`firstNameMember-${card.id_personnel_mairie}`}
              placeholder="Prénom du membre"
              title="Prénom"
            />
            <Field
              type="text"
              icon="user"
              iconPosition="left"
              value={lastNameValue}
              name={`lastNameMember-${card.id_personnel_mairie}`}
              placeholder="Nom du membre"
              title="Nom"
            />
            <Field
              type="text"
              icon="book"
              iconPosition="left"
              value={roleValue}
              name={`roleMember-${card.id_personnel_mairie}`}
              placeholder="Fonction du membre"
              title="Fonction"
            />
          </div>
        </Modal.Content>
        <Modal.Actions className="modalEditingCouncilMember-buttons">
          <Button className="button-cancel" onClick={handleClick}>
            Annuler
          </Button>
          <Button
            className="button-confirm"
            content="Mettre à jour"
            labelPosition="right"
            icon="checkmark"
            onClick={handleSubmit}
          />
        </Modal.Actions>
      </Modal>
      )}
      <Image src={photoValue} wrapped ui={false} />
      <Card.Content>
        <Card.Header className="card-header">{`${firstNameValue} ${lastNameValue}`}</Card.Header>
        <Card.Meta>
          <span className="fonction">{roleValue}</span>
        </Card.Meta>
      </Card.Content>
      {adminLogged && (
        <>
          <div className="editingIcon">
            <Icon name="pencil alternate" onClick={handleClick} />
          </div>
          <div className="deleteIcon">
            <Icon name="close" onClick={toggleDeleteConfirm} />
            <Confirm
              content="Êtes-vous sûr de vouloir supprimer ce membre ?"
              cancelButton="Annuler"
              confirmButton="Supprimer"
              open={confirm}
              onCancel={toggleDeleteConfirm}
              onConfirm={confirmDeleteClick}
            />
          </div>
        </>
      )}
    </Card>
  );
}

CardModel.propTypes = {
  prenom: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mairie_id: PropTypes.number.isRequired,
  id_personnel_mairie: PropTypes.number.isRequired,
};

export default CardModel;
