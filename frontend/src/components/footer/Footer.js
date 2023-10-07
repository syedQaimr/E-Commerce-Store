


import React from "react";
import playStore from "../../images/palystore.PNG";
import appStore from "../../images/appStore.PNG";
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';



import "./Footer.css";


const Footer = () => {
    const iconStyle = {
        marginRight: '5px', 
      };
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2021 &copy; uet</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/meabhisingh">
                    <FaInstagram style={{ ...iconStyle, color: '#E4405F' }} /> 
                </a>
                <a href="http://youtube.com/6packprogramemr">
                    <FaYoutube style={{ ...iconStyle, color: '#FF0000' }} /> 
                </a>
                <a href="http://facebook.com/meabhisingh">
                    <FaFacebook style={{ ...iconStyle, color: '#1877F2' }} /> 
                </a>
            </div>
        </footer>
    );
}

export default Footer