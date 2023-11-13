import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS
    , NEW_PRODUCT_FAIL , NEW_PRODUCT_REQUEST , NEW_PRODUCT_SUCCESS 
    , DELETE_PRODUCT_FAIL , DELETE_PRODUCT_REQUEST , DELETE_PRODUCT_SUCCESS
    ,EDIT_PRODUCT_FAIL , EDIT_PRODUCT_REQUEST , EDIT_PRODUCT_SUCCESS


} from '../constants/productConstant'
import { api } from '../apies/api';




export const getProducts = (keyword = "", currentPage = 1, price = [0, 100000000], category, rating = 0) => async (dispatch) => {

    console.log(price)
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });


        let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
        if (category) {
            link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await api.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error
        })

    }

}


export const getProductsAdmin = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await api.get('/products/all');
        console.log(data.length)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error
        })

    }

}


export const deleteProduct = (id) => async (dispatch) => {

    console.log(id)
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await api.delete(`/products/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.error
        })

    }

}



export const addNewProduct = (newProduct) => async (dispatch) => {

    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const { data } = await api.post('/products/add' , newProduct);
        

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.error
        })

    }

}



export const updateProduct = (id , updateProduct) => async (dispatch) => {

    try {
        dispatch({ type: EDIT_PRODUCT_REQUEST });
        const { data } = await api.put(`/products/${id}` , updateProduct);


        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: EDIT_PRODUCT_FAIL,
            payload: error.response.data.error
        })

    }

}


export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await api.get(`/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error
        })

    }

}


export const newReview = (reviewData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const { data } = await api.put('/review' , reviewData);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.error
        })

    }

}


export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}


