import { Icon } from 'semantic-ui-react';
import {
  SET_ACTIVE_INDEX,
  SET_ACTIVE_INDEX_TERMS,
  TOGGLE_REPORTING,
  SAVE_REPORTS,
  SAVE_ADMIN_REPORTS,
  CHANGE_REPORTS_FILTER,
  RESET_REPORTS_FILTER,
  UPDATE_FILTERED_REPORTS,
  CHANGE_CHECKBOX_ADMIN_REPORTING,
  CREATE_STATE_TEXTAREA_ADMINREPORT,
  CHANGE_CURRENT_TEXTAREA_ADMINREPORT,
  ERASE_VALUE_ACTIVE_INDEX,
} from '../actions/reports';

export const initialState = {
  activeIndex: -1,
  activeIndexTerms: -1,
  isReporting: false,
  reportsList: [],
  reportsAdminList: [],
  filteredReports: [],
  selectedCategory: '',
  selectedMonth: '',
  selectedYear: '',
  reporting_statut: '',
  categoriesOptions: [
    {
      // key: 'Catégories',
      text: 'Catégories',
      value: null,
    },
    {
      // key: 'Voirie',
      text: (<Icon className="dropdown-icon" name="road"> Voirie</Icon>),
      value: 'Voirie',
    },
    {
      // key: 'Eclairage public',
      text: (<Icon className="dropdown-icon" name="lightbulb"> Eclairage public</Icon>),
      value: 'Eclairage public',
    },
    {
      // key: 'Voisinage',
      text: (<Icon className="dropdown-icon" name="users"> Voisinage</Icon>),
      value: 'Voisinage',
    },
    {
      // key: 'Ramassage des déchets',
      text: (<Icon className="dropdown-icon" name="trash"> Ramassage des déchets</Icon>),
      value: 'Ramassage des déchets',
    },
    {
      // key: 'Objets trouvé/perdu',
      text: (<Icon className="dropdown-icon" name="key"> Objet trouvé ou perdu</Icon>),
      value: 'Objet trouvé ou perdu',
    },
    {
      // key: 'Autre',
      text: (<Icon className="dropdown-icon" name="bullhorn"> Autre</Icon>),
      value: 'Autre',
    },
  ],
  monthOptions: [
    {
      key: 'Mois',
      text: 'Mois',
      value: 'Mois',
    },
    {
      key: 'Janvier',
      text: 'Janvier',
      value: 'Janvier',
    },
    {
      key: 'Février',
      text: 'Février',
      value: 'Février',
    },
    {
      key: 'Mars',
      text: 'Mars',
      value: 'Mars',
    },
    {
      key: 'Avril',
      text: 'Avril',
      value: 'Avril',
    },
    {
      key: 'Mai',
      text: 'Mai',
      value: 'Mai',
    },
    {
      key: 'Juin',
      text: 'Juin',
      value: 'Juin',
    },
    {
      key: 'Juillet',
      text: 'Juillet',
      value: 'Juillet',
    },
    {
      key: 'Aout',
      text: 'Aout',
      value: 'Aout',
    },
    {
      key: 'Septembre',
      text: 'Septembre',
      value: 'Septembre',
    },
    {
      key: 'Octobre',
      text: 'Octobre',
      value: 'Octobre',
    },
    {
      key: 'Novembre',
      text: 'Novembre',
      value: 'Novembre',
    },
    {
      key: 'Décembre',
      text: 'Décembre',
      value: 'Décembre',
    },
  ],
  yearOptions: [
    {
      key: 'Année',
      text: 'Année',
      value: 'Année',
    },
    {
      key: '2021',
      text: '2021',
      value: '2021',
    },
    {
      key: '2022',
      text: '2022',
      value: '2022',
    },
  ],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /** State for opening accordion reports list */
    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.activeIndex,
        id: action.id,
      };

    /** State for opening accordion terms and conditions */
    case SET_ACTIVE_INDEX_TERMS:
      return {
        ...state,
        activeIndexTerms: action.activeIndexTerms,
      };

    /** Display Reporting component */
    case TOGGLE_REPORTING:
      return {
        ...state,
        isReporting: action.value,
      };

    /** Attribute reports to her state value */
    case SAVE_REPORTS:
      return {
        ...state,
        reportsList: action.payload,
      };

    /** Attribute admin reports to her state value */
    case SAVE_ADMIN_REPORTS:
      return {
        ...state,
        reportsAdminList: action.payload,
      };

    /** Management radio button of status response on admin report treatment */
    case CHANGE_CHECKBOX_ADMIN_REPORTING:
      return {
        ...state,
        reporting_statut: action.reporting_statut,
      };

    /** Select an option in filter */
    case CHANGE_REPORTS_FILTER:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Reset filter to default value */
    case RESET_REPORTS_FILTER:
      return {
        ...state,
        selectedCategory: '',
        selectedMonth: '',
        selectedYear: '',
      };

    /** Update list of reports filtered */
    case UPDATE_FILTERED_REPORTS:
      return {
        ...state,
        filteredReports: action.filteredReports,
      };

    /** Create dynamic state for text area of AdminReport component */
    case CREATE_STATE_TEXTAREA_ADMINREPORT:
      return {
        ...state,
        [action.key]: action.value,
      };

    /** Create dynamic state for text area of AdminReport component */
    case CHANGE_CURRENT_TEXTAREA_ADMINREPORT:
      return {
        ...state,
        [action.key]: action.value,
      };

    /**  Erase state value of activeIndex for accordion */
    case ERASE_VALUE_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: -1,
      };
    default:
      return state;
  }
};

export default reducer;
