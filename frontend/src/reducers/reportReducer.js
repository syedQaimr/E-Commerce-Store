import { REPORT_DATA_FAIL, REPORT_DATA_REQUEST, REPORT_DATA_SUCCESS , CLEAR_ERRORS } from "../constants/reportConstant"

export const reportReducer = ((state = { report: {} }, action) => {

    switch (action.type) {
        case REPORT_DATA_REQUEST:

            return {
                loading: true,
                report: {}
            }
        case REPORT_DATA_SUCCESS:

            return {
                loading: false,
                report: action.payload.report,            }

        case REPORT_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }

        default:
            return state
    }
})
