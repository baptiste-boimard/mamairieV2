import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleMenu } from '../../actions/menu';
import { redirect, setMessage } from '../../actions/utilities';

import Infos from '../Infos';
import './style.scss';

function Home() {
  const dispatch = useDispatch();

  /** After first page load
   * @toggleMenu Close menu
   * @redirect reset redirect state value
   * @setMessage reset error message state value
   */
  useEffect(() => {
    dispatch(toggleMenu());
    dispatch(redirect(''));
    dispatch(setMessage(''));
  });

  return (
    <div className="home">
      <Infos />
    </div>
  );
}

export default Home;
