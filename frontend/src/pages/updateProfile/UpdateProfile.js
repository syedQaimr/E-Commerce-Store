import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loader from '../../components/loader/Loader';


// import { GrCart } from "react-icons/gr";
import { MdEditSquare } from "react-icons/md"
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userContant';

function UpdateProfile() {

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const Navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")



    const registerDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    };




    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {name , email , avatar}

        dispatch(updateProfile(data));
    };

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatar(user.avatar)

        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Profile Updated Succesfully")
            dispatch(loadUser())
            Navigate('/account')
            dispatch({type: UPDATE_PROFILE_RESET})
        }
    }, [dispatch, error, alert, Navigate, user, isUpdated])

    return (
        <>
            {loading ? <Loader /> : <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <form className='loginForm' onSubmit={registerSubmit} encType="multipart/form-data">
                        <div className='header'>
                            <div className='headerText'>
                            <h2 className='headingStyle'>Update an Account</h2>
                            </div>
                            <div className='cartIcon'>
                                <MdEditSquare className="icons" style={{ fontSize: '55px' , color:"black" }} />
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <FaceIcon className='inputIcon' />
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='inputContainer'>
                            <MailOutlineIcon className='inputIcon' />
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={email}
                                name="email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className='inputContainer'>
                            <AccountCircleIcon className='inputIcon' />
                            <input
                                type='file'
                                name="avatar"
                                accept='image/*'
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type='submit' value='Update' className='loginBtn' />
                    </form>

                </div>
            </div>}
        </>
    )
}

export default UpdateProfile