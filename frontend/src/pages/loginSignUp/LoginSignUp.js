import React, { useEffect, useState } from 'react';
import './LoginSignUp.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loader from '../../components/loader/Loader';
import { useLocation } from 'react-router-dom';


import { GrCart } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {useDispatch ,useSelector} from 'react-redux';
import { login , clearErrors , register} from '../../actions/userAction';
import {useAlert} from 'react-alert';
function LoginSignUp() {
    
    const {error , loading , isAuthenticated} = useSelector((state)=> state.user);
    const Navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const loginTab = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const [user,setUser] = useState({
        name : "",
        email:"",
        passowrd:""
    })

    const { name, email, password } = user;

    const [avatar , setAvatar] = useState();

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };


    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
     
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {name , email , password , avatar}

        dispatch(register(data));
    };

    const currentLocation = useLocation();
    const redirect = currentLocation.search ? currentLocation.search.split('=')[1] : "/customer/account";
    

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isAuthenticated){
           Navigate(redirect)
        }
    }, [dispatch , error , alert , isAuthenticated , Navigate , redirect])

    return (
       <>
       {loading ? <Loader/> :  <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>

                {isLoginFormVisible ? (
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='header'>
                            <div className='headerText'>
                                <h2 className='headingStyle'>Sign In to Your Account</h2>
                                <p onClick={toggleForm} className='my-link'>No account? Create one</p>                            </div>
                            <div className='cartIcon'>
                                <GrCart className="icons" style={{ fontSize: '55px' }} />
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <MailOutlineIcon className='inputIcon' />
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='inputContainer'>
                            <LockOpenIcon className='inputIcon' />
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <input type='submit' value='Login' className='loginBtn' />
                        <Link to='/password/forget'>Forgot Password?</Link>
                    </form>
                ) : (
                    <form className='loginForm' ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data">
                        <div className='header'>
                            <div className='headerText'>
                                <h2 className='headingStyle'>Create an account</h2>
                                <p onClick={toggleForm} className='my-link'>Already have an account ?</p>                            </div>
                            <div className='cartIcon'>
                                <GrCart className="icons" style={{ fontSize: '55px' }} />
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
                                onChange={registerDataChange}
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
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='inputContainer'>
                            <LockOpenIcon className='inputIcon' />
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                name="password"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='inputContainer'>
                           <AccountCircleIcon className='inputIcon'/>
                            <input
                                type='file'
                                name="avatar"
                                accept='image/*'
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type='submit' value='SignUp' className='loginBtn' />
                    </form>
                )}
            </div>
        </div>}
       </>
    );
}

export default LoginSignUp;
