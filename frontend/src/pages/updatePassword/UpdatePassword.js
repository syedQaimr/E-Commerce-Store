import React from 'react';
import './UpdatePassword.css';
import Loader from '../../components/loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { FcLock } from "react-icons/fc";
import { useEffect } from 'react';
import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';





import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userContant';

function UpdatePassword() {

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };


  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };


  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };




  const registerSubmit = (e) => {
    e.preventDefault();
    const data = { oldPassword, newPassword, confirmPassword }
    dispatch(updatePassword(data));
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success("Password Updated Succesfully")
      Navigate('/account')
      dispatch({ type: UPDATE_PASSWORD_RESET })
    }
  }, [dispatch, error, alert, Navigate, isUpdated])
  return (
    <>{loading ? <Loader /> : <div className='LoginSignUpContainer'>
      <div className='LoginSignUpBox'>
        <form className='loginForm' onSubmit={registerSubmit} encType="multipart/form-data">
          <div className='header'>
            <div className='headerText'>
              <h2 className='headingStyle'>Update Password</h2>
            </div>
            <div className='cartIcon'>
              <FcLock className="icons" style={{ fontSize: '55px', color: "black" }} />
            </div>
          </div>
          <div className='inputContainer'>
            <LockOpenIcon className='inputIcon' />
            <input
              type={showOldPassword ? 'text' : 'password'}
              placeholder='OldPassword'
              required
              value={oldPassword}
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {showOldPassword ? (
              <VisibilityIcon className='showPassword' onClick={toggleOldPasswordVisibility} />
            ) : (
              <VisibilityOffIcon className='showPassword' onClick={toggleOldPasswordVisibility} />
            )}
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
          <input type='submit' value='Update' className='loginBtn' />
        </form>

      </div>
    </div>}
    </>
  )
}

export default UpdatePassword