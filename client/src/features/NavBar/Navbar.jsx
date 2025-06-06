import "./navbar.css";
import logo from "./../../assets/logo.svg";
import {NavLink, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";
import {useContext} from 'react';
import {AuthContext} from './../../contexts/AuthContext';

const NavBar = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const isAdmin = localStorage.getItem("role") !== null && localStorage.getItem("role") === "admin";

    const navigate = useNavigate()

    const handleLogout = () => {
        AuthService.getInstance().logout(() => navigate('/')).then(() => {
            setIsAuthenticated(false)
            navigate("/")
        })
    }


    return (
        <nav className="px-4 py-2 flex gap-10 content-center justify-between items-center ">
            <div className="flex items-center gap-3 text-[#84cc16]">
                <NavLink className="flex gap-3 items-center" to={"/"}>
                    <img src={logo} alt="Logo" className="navbar__logo-image"/>
                    <h1>TIKERA</h1>
                </NavLink>
                {
                    isAuthenticated ?
                        (
                            <>
                                <NavLink to={'/my-bookings'}>My Bookings</NavLink>
                                {isAdmin ?
                                    <NavLink to={'/manage-films'}>Manage films</NavLink>
                                    : null}
                            </>
                        )
                        : null
                }
            </div>
            <div>
                <h1 className="text-[#84cc16]">{isAuthenticated ? (localStorage.getItem("name")) : null}</h1>
            </div>
            <div>{isAuthenticated ? (
                <NavLink className="text-[#84cc16]" to={"/"} onClick={handleLogout}>
                    Logout
                </NavLink>
            ) : (
                <div className="flex items-center gap-6">
                    <NavLink to={"/login"} className="text-[#84cc16]" title="Login">
                        Login
                    </NavLink>
                    <NavLink to={"/register"} className="text-[#84cc16]">
                        Register
                    </NavLink>
                </div>
            )}
            </div>

        </nav>
    );
};

export default NavBar;
