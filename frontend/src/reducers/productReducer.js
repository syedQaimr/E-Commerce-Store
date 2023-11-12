import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS
    , NEW_PRODUCT_FAIL , NEW_PRODUCT_REQUEST , NEW_PRODUCT_SUCCESS , NEW_PRODUCT_RESET
    , DELETE_PRODUCT_FAIL , DELETE_PRODUCT_REQUEST , DELETE_PRODUCT_RESET , DELETE_PRODUCT_SUCCESS
    , EDIT_PRODUCT_FAIL , EDIT_PRODUCT_REQUEST , EDIT_PRODUCT_RESET , EDIT_PRODUCT_SUCCESS
} from '../constants/productConstant'


export const productReducer = ((state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:

            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:

            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
            }

        case ALL_PRODUCT_FAIL:


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




export const productDetailsReducer = ((state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:

            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:

            return {
                loading: false,
                product: action.payload,
            }

        case PRODUCT_DETAILS_FAIL:


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


export const newReviewReducer = ((state = { newReivew: {} }, action) => {

    switch (action.type) {
        case NEW_REVIEW_REQUEST:

            return {
                loading: true,
                ...state
            }
        case NEW_REVIEW_SUCCESS:

            return {
                loading: false,
                success: action.payload,
            }

        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                success: false,
                loading : false
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




export const newProductReducer = ((state = { newProduct: {} }, action) => {

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:        
            return {
                loading: true,
                ...state
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }

        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                success: false,
                loading : false
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



export const deleteProductReducer = ((state = { deleteProduct: {} }, action) => {

    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        
            return {
                loading: true,
                ...state
            }
        case DELETE_PRODUCT_SUCCESS:

            return {
                loading: false,
                success: action.payload,
            }

        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_PRODUCT_RESET:
            return {
                success: false,
                loading : false
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

export const editProductReducer = ((state = { editProduct: {} }, action) => {

    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
        
            return {
                loading: true,
                ...state
            }
        case EDIT_PRODUCT_SUCCESS:

            return {
                loading: false,
                success: action.payload,
            }

        case EDIT_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_PRODUCT_RESET:
            return {
                success: false,
                loading : false
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

