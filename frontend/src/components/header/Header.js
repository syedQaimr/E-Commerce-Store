import React, { useState } from "react";
import "./Header.css";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import { useEffect } from "react";








const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return (
        <>
            <nav className={`main-nav ${isSticky ? "sticky" : ""}`} >
                {/* 1st logo part */}
                <div className="logo">
                    <h2>
                        <span>E</span>Commerce
                        <span>Web</span>Site
                    </h2>
                </div>

                {/* 2nd menu part */}
                <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
                    <ul>
                        <li>
                            <NavLink to="/" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/products" >Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/service" >Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/contact" >Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/search" >
                                <AiOutlineSearch className="icons" style={{ fontSize: '24px' }} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/login" >
                                <BiSolidUserCircle className="icons" style={{ fontSize: '24px' }} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/customer/cart" className={(navData) => navData.isActive ? 'active': "nothing"}>
                                <AiFillShopping className="icons" style={{ fontSize: '24px' }} />
                            </NavLink>
                            
                        </li>
                    </ul>
                </div>


                {/* 3rd social media links */}
                <div className="social-media">
                    <ul className="social-media-desktop">
                        <li>
                            <a href="https://wa.me/033543810120" className="whatsapp">
                                <FaWhatsapp className="whatsapp" /> {/* WhatsApp icon */}
                            </a>
                        </li>
                        <li>
                            <br />
                            +92 032-76654532
                        </li>
                    </ul>

                    {/* hamburget menu start */}
                    <div className="hamburger-menu">
                        <button  onClick={() => setShowMediaIcons(!showMediaIcons)}>
                            <GiHamburgerMenu />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
