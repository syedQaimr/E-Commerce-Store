import React from 'react';
import './ForgotPassword.css';
import Loader from '../../components/loader/Loader';
import { FcLock } from "react-icons/fc";
import { GiToken } from "react-icons/gi"
import { useEffect } from 'react';
import { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';


import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { forgotPassword , resetPassword } from '../../actions/userAction';
import { RESET_PASSWORD_RESET } from '../../constants/userContant';

function ForgotPassword() {

  const { error, loading  , message} = useSelector((state) => state.forgotPassword);

  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [token , setToken] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };


  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };







  const sendToken = (e) => {
    try {
      e.preventDefault();
      const data = { email }
      console.log(data);
      dispatch(forgotPassword(data));
    } catch (error) {
      alert.error("Try Late")
    }
    
  };

  const registerSubmit = (e) => {
   try {
     e.preventDefault();
     const data = { newPassword , confirmPassword , token }
     dispatch(resetPassword(data));
     alert.success("SuccessFully Updated");
     Navigate('/');


   } catch (error) {
    alert.error("Try Late")
   }
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if(message){
      alert.success(message)
      dispatch({ type: RESET_PASSWORD_RESET })

    }
   

  }, [dispatch, error, alert , message])

  return (
    <>
      {loading ? <Loader /> : <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
          <form className='loginForm' onSubmit={registerSubmit} encType="multipart/form-data">
            <div className='header'>
              <div className='headerText'>
                <h2 className='headingStyle'>Forgot Password </h2>
              </div>
              <div className='cartIcon'>
                <FcLock className="icons" style={{ fontSize: '55px', color: "black" }} />
              </div>
            </div>
            <div className='inputContainer'>
              <MailOutlineIcon className='inputIcon' />
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button value='SendEmail'  className="button1"  onClick={sendToken} >Send Token</button>
            <div className='inputContainer'>
              <GiToken className='inputIcon' />
              <input
                type='txt'
                placeholder='Enter token'
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className='inputContainer'>
              <LockOpenIcon className='inputIcon' />
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder='NewPassword'
                required
                value={newPassword}
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {showNewPassword ? (
                <VisibilityIcon className='showPassword' onClick={toggleNewPasswordVisibility} />
              ) : (
                <VisibilityOffIcon className='showPassword' onClick={toggleNewPasswordVisibility} />

              )}
            </div>
            <div className='inputContainer'>
              <LockOpenIcon className='inputIcon' />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='ConfirmPassword'
                required
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showConfirmPassword ? (
                <VisibilityIcon className='showPassword' onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <VisibilityOffIcon className='showPassword' onClick={toggleConfirmPasswordVisibility} />

              )}
            </div>

            <input type='submit' value='Send' className='loginBtn'  />
          </form>

        </div>
      </div>}
    </>
  )
}

export default ForgotPassword;