import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { toggleRecycling, toggleWaste } from '../../actions/infos';
import schedule from '../../assets/images/waste/schedule.jpg';
import guide from '../../assets/images/waste/guide.png';
import landfill from '../../assets/images/waste/landfill.png';

import './style.scss';

function Infos() {
  const dispatch = useDispatch();

  const { isOpenWaste, isOpenRecycling } = useSelector((state) => state.infos);

  /** Clicking waste button
   * @toggleWaste display clendar and infos for waste
   */
  const handleClickWaste = () => {
    dispatch(toggleWaste());
  };

  /** Clicking landfill button
   * @toggleRecycling display landfill infos
   */
  const handleClickRecycling = () => {
    dispatch(toggleRecycling());
  };

  return (
    <div className="infos">

      <h2>Infos pratiques</h2>

      <Button className="infos-button" onClick={handleClickWaste} icon="trash" content="Ramassage des déchets" />
      {isOpenWaste && (
        <div className="infos-waste infos-content">
          <h3>Calendrier ramassage des déchets 2022</h3>
          <img src={schedule} className="header-logo" alt="Mairie" />
          <h3>Guide de tri</h3>
          <img src={guide} className="header-logo" alt="Mairie" />
        </div>
      )}

      <Button className="infos-button" onClick={handleClickRecycling} icon="factory" content="Déchetterie" />
      {isOpenRecycling && (
        <div className="infos-recycling infos-content">
          <h3>Plan d'accès et horaires</h3>
          <img src={landfill} className="header-logo" alt="Mairie" />
        </div>
      )}

    </div>
  );
}

export default Infos;
