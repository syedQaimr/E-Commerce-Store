import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children , role=''}) => {
    const {isAuthenticated} = useSelector((state) => state.user);
    const {user} = useSelector((state) => state.user);
    console.log(user)

    let location = useLocation();

    if(!isAuthenticated) {
        console.log("hello --" , isAuthenticated)
        return <Navigate to="/customer/login" state={{ from: location}} replace />
    }
    console.log("hello ++" , isAuthenticated)
    if(role==='admin' && user.role !== 'admin'){
        console.log("hello --" , isAuthenticated)
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;