import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../Header';
import Menu from '../Menu';
import Home from '../Home';
import Footer from '../Footer';
import Admin from '../Admin';
import Reports from '../Reports';
import ReportAdmin from '../ReportAdmin';
import InProgress from '../InProgress';
import Council from '../Council';

import { checkToken, login, setTownHallId } from '../../actions/login';
import { toggleMenu } from '../../actions/menu';
import NotFound from '../NotFound';

import 'semantic-ui-css/semantic.min.css';
import './style.scss';
import { getCouncilMembers } from '../../actions/council';

function App() {
  const dispatch = useDispatch();

  const townHallId = useSelector((state) => state.login.townHallId);
  const adminlogged = useSelector((state) => state.login.logged);

  /** After first page load
   * @setTownHallId attribute townHallId to state
   * @toggleMenu open menu component
   */
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      dispatch(login());
    }
    // dispatch(checkToken());
    dispatch(setTownHallId(1));
    dispatch(toggleMenu(true));
    dispatch(getCouncilMembers());
  }, []);

  return (
    <div className="app">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={(<Admin />)} />
        <Route path={`/reports/:${townHallId}`} element={<Reports />} />
        <Route path={`/council/:${townHallId}`} element={<Council />} />
        <Route path={`/articles/:${townHallId}`} element={<InProgress />} />
        <Route path={`/school/:${townHallId}`} element={<InProgress />} />

        { adminlogged && (
          <>
            <Route path={`/admin/reports/:${townHallId}`} element={<Reports />} />
            <Route path={`/admin/reports/:${townHallId}/:reporting_id`} element={<ReportAdmin />} />
            <Route path={`/admin/council/:${townHallId}`} element={<Council />} />

          </>
        )};
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
