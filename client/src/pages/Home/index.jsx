import {Main} from "../../features/Movies/Main.jsx";
import NavBar from "../../features/NavBar/Navbar.jsx";
import {Outlet, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";
import Movies from "../Movies/index.jsx";
import {useEffect} from "react";

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!AuthService.getInstance().isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}