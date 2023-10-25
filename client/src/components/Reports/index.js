/* eslint-disable implicit-arrow-linebreak */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Dropdown, Loader, Message } from 'semantic-ui-react';

import {
  changeReportsFilter,
  getAdminReports, getReports,
  // updateFilteredReports,
} from '../../actions/reports';
import Reporting from '../Reporting';
import Report from './Report';
import ReportButton from './ReportButton';

import './style.scss';

function Reports() {
  const dispatch = useDispatch();

  const {
    isReporting,
    categoriesOptions,
    monthOptions,
    yearOptions,
  } = useSelector((state) => state.reports);

  const { loading, message, messageColor } = useSelector((state) => state.utilities);

  const { logged } = useSelector((state) => state.login);
  const { selectedCategory, selectedMonth, selectedYear } = useSelector((state) => state.reports);

  /** select the report in in terms of pathname */
  const reports = useSelector((state) => {
    if (window.location.pathname.includes('admin') && logged) {
      return state.reports.reportsAdminList;
    }
    return state.reports.reportsList;
  });
  let filteredReports;

  /** After first page load
   * @getAdminReports get admin reports list from API
   * @getReports get reports list from API
   */
  useEffect(() => {
    if (window.location.pathname.includes('admin') && logged) {
      dispatch(getAdminReports());
    } else {
      dispatch(getReports());
    }
  }, []);

  /** list of month in french fot moment */
  moment.updateLocale('fr', {
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
      'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ],
  });

  /** Conditions fo filter reports in function dropdown values */
  if ((selectedCategory === '' || selectedCategory === 'Catégories')
  && (selectedYear === '' || selectedYear === 'Année')
  && (selectedMonth === '' || selectedMonth === 'Mois')) {
    filteredReports = reports;
  } else if ((selectedCategory === '' || selectedCategory === 'Catégories')
    && (selectedMonth === '' || selectedMonth === 'Mois')) {
    filteredReports = reports.filter((report) =>
      moment(report.created_at).format('YYYY') === selectedYear);
  } else if ((selectedCategory === '' || selectedCategory === 'Catégories')
    && (selectedYear === '' || selectedYear === 'Année')) {
    filteredReports = reports.filter((report) =>
      moment(report.created_at).locale('fr').format('MMMM') === selectedMonth);
  } else if ((selectedMonth === '' || selectedMonth === 'Mois')
    && (selectedYear === '' || selectedYear === 'Année')) {
    filteredReports = reports.filter((report) =>
      report.reporting_category === selectedCategory);
  } else if (selectedMonth === '' || selectedMonth === 'Mois') {
    filteredReports = reports.filter((report) =>
      report.reporting_category === selectedCategory
      && moment(report.created_at).format('YYYY') === selectedYear);
  } else if (selectedYear === '' || selectedYear === 'Année') {
    filteredReports = reports.filter((report) =>
      report.reporting_category === selectedCategory
      && moment(report.created_at).locale('fr').format('MMMM') === selectedMonth);
  } else if (selectedCategory === '' || selectedCategory === 'Catégories') {
    filteredReports = reports.filter((report) =>
      moment(report.created_at).format('YYYY') === selectedYear
      && moment(report.created_at).locale('fr').format('MMMM') === selectedMonth);
  } else {
    filteredReports = reports.filter((report) =>
      report.reporting_category === selectedCategory
      && moment(report.created_at).locale('fr').format('MMMM') === selectedMonth
      && moment(report.created_at).format('YYYY') === selectedYear);
  }

  /** Change a filter
   * @changeReportsFilter change state value on controlled field
   */
  const handleChangeFilter = (event) => {
    const key = event.target.closest('.filter-dropdown').getAttribute('name');
    dispatch(changeReportsFilter(event.target.textContent, key));
  };

  return (
    <div className="reports-content">
      {/* Section for reporting action */}
      {isReporting && (<Reporting />)}

      {/* {!isReporting && (<h1 className="reports-title">Votre outils de signalement</h1>)} */}

      <ReportButton />

      <div className="message-container">
        {(message && !isReporting) && (
          messageColor
            ? <Message positive>  <p>{message}</p> </Message>
            : <Message negative>  <p>{message}</p> </Message>
        )}
      </div>

      {/* Section to filter reports list */}
      {!isReporting && (
        <section className="filter-section">
          <Dropdown
            className="filter-dropdown categories"
            placeholder="Catégories"
            title="Catégories"
            fluid
            selection
            onChange={handleChangeFilter}
            options={categoriesOptions}
            name="selectedCategory"
          />
          <Dropdown
            className="filter-dropdown"
            placeholder="Mois"
            title="Mois"
            fluid
            selection
            onChange={handleChangeFilter}
            options={monthOptions}
            name="selectedMonth"
          />
          <Dropdown
            className="filter-dropdown"
            placeholder="Année"
            title="Année"
            fluid
            selection
            onChange={handleChangeFilter}
            options={yearOptions}
            name="selectedYear"
          />
        </section>
      )}

      {/* Section for reports list */}
      { loading && (
        <Loader active inline="centered" />
      )}
      {!isReporting && !loading && (
        <section className="reports-container">
          {filteredReports.map((report) => <Report key={report.reporting_id} {...report} />)}
        </section>
      )}
    </div>
  );
}

export default Reports;
