import { api } from '../apies/api';
import {
  DASHBOARD_DATA_FAIL,
  DASHBOARD_DATA_REQUEST,
  DASHBOARD_DATA_SUCCESS
} from "../constants/systemConstants";


export const adminDashboard = () => async (dispatch) => {

  
    try{
        dispatch({type: DASHBOARD_DATA_REQUEST})
        const { data } = await api.get("/admin/dashboard");
        console.log(data)
  
        dispatch({ type: DASHBOARD_DATA_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({ type: DASHBOARD_DATA_FAIL});
    }
      
  };