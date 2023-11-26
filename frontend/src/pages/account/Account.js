import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../../components/layout/MetaData';
import Loader from '../../components/loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Account.css'

function Account() {

  const Navigate = useNavigate()

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(()=>{

    if(isAuthenticated === false){
      Navigate('/customer/login');
    }

  },[isAuthenticated , Navigate])

  return (
    <>
    {loading ? <Loader/> : 
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className='profileContainer'>
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar} alt={user.name} />
          <Link to='/customer/me/update'>Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0,10)}</p>
          </div>
          <div>
            <Link to="/customer/orders">My Orders</Link>
            <Link to="/customer/password/update">Change Password</Link>

          </div>
        </div>
      </div>
    </>
    }
    </>
  )
}

export default Account