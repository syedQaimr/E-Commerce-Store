import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH ,
    withCredentials : true ,
    headers : {
        "Content-Type" : "application/json",
    }
});

export const api_MultiPart_FormData = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH ,
    withCredentials : true ,
    headers : {
        "Content-Type": "multipart/form-data",
    }
});


