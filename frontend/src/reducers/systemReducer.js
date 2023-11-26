import {
   CHANGE_DARK_MODE,
   CHANGE_DOPEN,
   DASHBOARD_DATA_FAIL,
   DASHBOARD_DATA_REQUEST,
   DASHBOARD_DATA_SUCCESS,
  } from "../constants/systemConstants";
  
  export const systemReducer = (
    state = { darkMode: false, dOpen: true },
    action
  ) => {
    switch (action.type) {
      case CHANGE_DARK_MODE:
        return{
            ...state,
            darkMode : action.payload
        }
      case CHANGE_DOPEN:
        return {
          ...state,
          dOpen: action.payload,
        };
      default:
        return state;
    }
  };

  export const adminDashboardReducer = (
    state = { data:{}},
    action
  ) => {
    switch (action.type) {
      case DASHBOARD_DATA_REQUEST:
        return{
            ...state,
            loading : true
        }
      case DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          loading : false,
          data : action.payload
        };
        case DASHBOARD_DATA_FAIL:
          return {
            ...state,
            loading : false,
            data : null
          };
      default:
        return state;
    }
  };