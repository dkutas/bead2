import "./navbar.css"; // Assuming you have a CSS file for styling
import logo from "./../../assets/logo.svg"; // Replace with your logo path
import {Link} from "@mui/material";
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
                    <img src={logo} alt="Logo" className="navbar__logo-image_manage_films"/>
                    <h1>TIKERA</h1>
                </NavLink>
                <>
                    <NavLink to={'/manage-films'}>My Bookings</NavLink>
                    {AuthService.getInstance().isAdmin() ?
                        <NavLink to={'/manage-films/add-booking'}>Manage films</NavLink> : null}
                </>
            </div>
            <div>
                <h1 className="text-[#84cc16]">{AuthService.getInstance().isAuthenticated() ? (localStorage.getItem("userName")) : null}</h1>
            </div>
            <div>
                <NavLink className="text-[#84cc16]" to={"/"} onClick={handleLogout}>
                    Logout
                </NavLink>
            </div>

        </nav>
    );
};

export default NavBar;
