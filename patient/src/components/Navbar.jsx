import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axiosInstance from "../services/setupAxios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { FaHome } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { GiSyringe } from "react-icons/gi";
const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

 
  const handleLogout =  () => {
 
        localStorage.clear()
        setIsAuthenticated(false);
        toast.success("Logout done!");
        navigateTo("/login")
 
  };

    const navigateTo = useNavigate();

    const goToLogin = () => {
        navigateTo("/login");
    };

    return (
        <>
            <nav className={"container"}>
                <div className="logo">
                    <p style={{fontWeight:"bold",color:"green"}}> <GiSyringe/>Raj Medical</p>
                </div>
                <div className={!show ? "navLinks showmenu" : "navLinks"}>
                    <div className="links">
                        <Link style={{ display: "flex", alignItems: "center" }} to={"/"} onClick={() => setShow(!show)}>
                            <FaHome size={20} />  Home
                        </Link>
                        {isAuthenticated && <Link style={{ display: "flex", alignItems: "center",gap:2 }} to={"/appointment"} onClick={() => setShow(!show)}>
                            <TfiWrite size={18} />   Appointment
                        </Link>}
                        {/* <Link to={"/about"} onClick={() => setShow(!show)}>
                            About Us
                        </Link> */}
                    </div>
                    {isAuthenticated ? (
                        <button style={{borderRadius:3,background:"red",padding:5,fontSize:14}} className="logoutBtn btn" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    ) : (
                        <button style={{ background: "green" }} className="loginBtn btn" onClick={goToLogin}>
                            LOGIN
                        </button>
                    )}
                </div>
                <div className="hamburger" onClick={() => setShow(!show)}>
                    <GiHamburgerMenu />
                </div>
            </nav>
        </>
    );
};

export default Navbar;