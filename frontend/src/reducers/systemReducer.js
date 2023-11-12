import {
   CHANGE_DARK_MODE,
   CHANGE_DOPEN
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