import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector((state) => state.user);
    let location = useLocation();

    if(!isAuthenticated) {
        console.log("hello --" , isAuthenticated)
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    console.log("hello ++" , isAuthenticated)
 return children

};

export default ProtectedRoute;