import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Image, Icon } from 'semantic-ui-react';

import CardModel from './CardModel';

import { getCouncilMembers, postCouncilMembers } from '../../actions/council';

import './style.scss';

function Council() {
  const dispatch = useDispatch();

  const adminLogged = useSelector((state) => state.login.logged);
  const { councilMembers } = useSelector((state) => state.council);

  /** Click on Plus button
   * @postCouncilMembers post new member council to API
   */
  const handleClick = () => {
    dispatch(postCouncilMembers());
  };

  /**  After first page load
   * @getCouncilMembers resquest get council member from API
   */
  useEffect(() => {
    dispatch(getCouncilMembers());
  }, []);

  return (
    <section className="card-container">
      <h2>Présentation du conseil Municipal</h2>
      {councilMembers.map((card) => (
        <CardModel key={card.id_personnel_mairie} imageName={card.photo} name={`${card.prenom} ${card.nom}`} role={card.role} {...card} />
      ))}
      {adminLogged && (
        <Card className="card">
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" wrapped ui={false} />
          <Card.Content as="button" className="content-circle" onClick={handleClick}>
            <div>
              <Icon size="big" name="plus circle" />
            </div>
            <h2>Ajouter un membre</h2>
          </Card.Content>
        </Card>
      )}
    </section>
  );
}

export default Council;
