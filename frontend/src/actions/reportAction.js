import { CLEAR_ERRORS, REPORT_DATA_FAIL, REPORT_DATA_REQUEST, REPORT_DATA_SUCCESS } from "../constants/reportConstant";
import {api} from '../apies/api';





export const getSalesReport = () => async (dispatch) => {

    try {
        dispatch({ type: REPORT_DATA_REQUEST });
        const { data } = await api.get('/report/sales');

        dispatch({
            type: REPORT_DATA_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REPORT_DATA_FAIL,
            payload: error.response.data.error
        })

    }

}

export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}

