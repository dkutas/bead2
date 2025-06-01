import "./navbar.css"; // Assuming you have a CSS file for styling
import logo from "./../../assets/logo.svg"; // Replace with your logo path
import {Navitem} from "./NavItem";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {Link} from "@mui/material";
import {NavLink, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";

const NavBar = () => {
    const days = useSelector((state) => state.app.days);
    const currentDay = useSelector((state) => state.app.currentDay);
    const navigate = useNavigate()

    const handleLogout = () => {
        AuthService.getInstance().logout(() => navigate('/'))
    }

    return (
        <nav className="px-4 py-2 flex gap-10 content-center justify-between items-center ">
            <div className="flex items-center gap-3 text-[#84cc16]">
                <NavLink className="flex gap-3 items-center" to={"/movies"}>
                    <img src={logo} alt="Logo" className="navbar__logo-image"/>
                    <h1>TIKERA</h1>
                </NavLink>
                {
                    AuthService.getInstance().isAuthenticated() ?
                        (
                            <>
                                <NavLink to={'/my-bookings'}>My Bookings</NavLink>
                                <NavLink to={'/manage-films'}>Manage films</NavLink>
                            </>
                        )
                        : null
                }
            </div>
            <ul className="navbar__links">
                {days.map((day, index) => {
                    const actualClassNames = classNames({
                        leftlink: index === 0,
                        rightlink: index === 6,
                        active: currentDay === index + 1,
                    });

                    return (
                        <Navitem
                            key={index}
                            classNames={actualClassNames}
                            day={day}
                            index={index}
                        />
                    );
                })}
            </ul>
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
