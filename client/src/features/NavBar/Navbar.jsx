import "./navbar.css";
import logo from "./../../assets/logo.svg";
import {NavLink, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";

const NavBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        AuthService.getInstance().logout(() => navigate('/'))
    }

    if (AuthService.getInstance().isAuthenticated()) {
        console.log(AuthService.getInstance())
    }

    return (
        <nav className="px-4 py-2 flex gap-10 content-center justify-between items-center ">
            <div className="flex items-center gap-3 text-[#84cc16]">
                <NavLink className="flex gap-3 items-center" to={"/"}>
                    <img src={logo} alt="Logo" className="navbar__logo-image"/>
                    <h1>TIKERA</h1>
                </NavLink>
                {
                    AuthService.getInstance().isAuthenticated() ?
                        (
                            <>
                                <NavLink to={'/my-bookings'}>My Bookings</NavLink>
                                {AuthService.getInstance().isAdmin() ?
                                    <NavLink to={'/manage-films'}>Manage films</NavLink> : null}
                            </>
                        )
                        : null
                }
            </div>
            <div>
                <h1 className="text-[#84cc16]">{AuthService.getInstance().isAuthenticated() ? (localStorage.getItem("userName")) : null}</h1>
            </div>
            <div>{AuthService.getInstance().isAuthenticated() ? (
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
