import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS , REGISTER_SUCCESS , REGISTER_FAIL , REGISTER_REQUEST , LOAD_USER_REQUEST , LOAD_USER_SUCCESS , LOAD_USER_FAIL , LOGOUT_FAIL , LOGOUT_SUCCESS , UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS ,  UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_REQUEST , UPDATE_PASSWORD_SUCCESS , FORGOT_PASSWORD_FAIL , FORGOT_PASSWORD_REQUEST , FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from '../constants/userContant';
import {api} from '../apies/api';
import ErrorPage from '../components/frontendErrorHandler/ErrorPage'



export const login = (email , password)=> async (dispatch) =>{
    try{
        dispatch({type : LOGIN_REQUEST});


        
        const {data} = await api.post('/user/login' , {email , password});

        dispatch({ type : LOGIN_SUCCESS , payload: data.user})
    }
    catch(error){
        console.log(error.response.data)
        dispatch({type: LOGIN_FAIL , payload: error.response.data.message});
    }
};


export const loadUser = ()=> async (dispatch) =>{
    try{
        dispatch({type : LOAD_USER_REQUEST});

        const {data} = await api.get('/user/me');
        console.log("Hello")

        dispatch({ type : LOAD_USER_SUCCESS , payload: data.user})
    }
    catch(error){
        if(error.message === "Network Error"){
            dispatch({type: LOAD_USER_FAIL , payload: error.message});
        }
        else{
        console.log("yes" , error.response)
        console.log(error.response.data.message);
        dispatch({type: LOAD_USER_FAIL , payload: error.response.data.message});
        }
    }
};


export const logOut = ()=> async (dispatch) =>{
    try{

        await api.get('/user/logout');

        dispatch({ type : LOGOUT_SUCCESS})
    }
    catch(error){
        dispatch({type: LOGOUT_FAIL , payload: error.response.data.message});
    }
};



export const register = (userData)=> async (dispatch) =>{
    try{
        dispatch({type : REGISTER_REQUEST});


        const {data} = await api.post('/user/register' , userData );
       

        dispatch({type : REGISTER_SUCCESS , payload : data.user});
       
    }
    catch(error){
        console.log(error.response.data)
        dispatch({type: REGISTER_FAIL , payload: error.response.data.message});
    }
};



export const updateProfile = (user)=> async (dispatch) =>{
    try{
        dispatch({type : UPDATE_PROFILE_REQUEST});


        
        const {data} = await api.put('/user/me/update' , user);


        dispatch({ type : UPDATE_PROFILE_SUCCESS , payload: data.success})
    }
    catch(error){
        console.log(error.response.data)
        dispatch({type: UPDATE_PROFILE_FAIL , payload: error.response.data.message});
    }
};



export const updatePassword = (passwords)=> async (dispatch) =>{
    try{
        dispatch({type : UPDATE_PASSWORD_REQUEST});

        const {data} = await api.put('/user/password/update' , passwords);


        dispatch({ type : UPDATE_PASSWORD_SUCCESS , payload: data.success})
    }
    catch(error){
        dispatch({type: UPDATE_PASSWORD_FAIL , payload: error.response.data.message});
    }
};

export const forgotPassword = (email )=> async (dispatch) =>{
    try{
        dispatch({type : FORGOT_PASSWORD_REQUEST});
        console.log(email)
        
        const {data} = await api.post('/user/password/forgot' , email);

        dispatch({ type : FORGOT_PASSWORD_SUCCESS , payload: data.message})
    }
    catch(error){
        console.log(error.response.data)
        dispatch({type: FORGOT_PASSWORD_FAIL , payload: error.response.data.message});
    }
};

export const resetPassword = (resetPasswords )=> async (dispatch) =>{
    try{
        dispatch({type : RESET_PASSWORD_REQUEST});
        
        const {data} = await api.put('/user/password/reset' , resetPasswords);

        dispatch({ type : RESET_PASSWORD_SUCCESS , payload: data.message})
    }
    catch(error){
        console.log(error.response.data)
        dispatch({type: RESET_PASSWORD_FAIL , payload: error.response.data.message});
    }
};



export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch({ type: GET_ALL_USER_REQUEST });

        const { data } = await api.get('/admin/users');

        dispatch({
            type: GET_ALL_USER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_ALL_USER_FAIL,
            payload: error.response.data.error
        })

    }

}


export const deleteUser = (id) => async (dispatch) => {

    console.log(id)
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await api.delete(`/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error
        })

    }

}




export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}

