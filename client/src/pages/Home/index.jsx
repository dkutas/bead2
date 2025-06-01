import {Main} from "../../features/Movies/Main.jsx";
import NavBar from "../../features/NavBar/Navbar.jsx";
import {Outlet, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";

export default function Home() {
    const navigate = useNavigate();
    if (!AuthService.getInstance().isAuthenticated()) {
        navigate("/movies");
    }
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}