import {Main} from "../../features/Movies/Main.jsx";
import NavBar from "../../features/NavBar/Navbar.jsx";
import {Outlet, useNavigate} from "react-router";
import {AuthService} from "../../services/auth.service.js";
import Movies from "../Movies/index.jsx";
import {useEffect, useContext} from "react";
import {SnackBarContext} from "../../contexts/SnackBarContext.jsx";
import {Snackbar, Alert} from "@mui/material";

export default function Home() {
    const navigate = useNavigate();
    const {snackbar, setSnackbar} = useContext(SnackBarContext);
    useEffect(() => {
        if (!AuthService.getInstance().isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <NavBar/>
            <Outlet/>
            <Snackbar
                open={snackbar.open}
                onClose={() => setSnackbar({...snackbar, open: false})}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                    onClose={() => setSnackbar({...snackbar, open: false})}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}