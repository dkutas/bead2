import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {AuthService} from "../../services/auth.service.js";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {SnackBarContext} from "../../contexts/SnackBarContext.jsx"; // You'll need to create this

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext); // Add this
    const {setSnackbar} = useContext(SnackBarContext); // Add this for snackbar notifications

    const handleLogin = (e) => {
        e.preventDefault()
        try {
            AuthService.getInstance().login({email, password}).then(response => {
                setIsAuthenticated(true)
                navigate("/")
                setSnackbar({
                    open: true,
                    message: "Login successful!",
                    severity: "success"
                });
            })
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Login failed. Please check your credentials.",
                severity: "error"
            });
            console.error("Login failed:", error);
        }
    }

    return <form
        className="flex flex-col gap-3 items-center justify-center rounded-xl px-[227px] py-[44px] text-white">
        <h2 className="text-[36px] font-[700]">
            Login
        </h2>
        <TextField
            label="Email"
            variant="filled"
            className="w-lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
                backgroundColor: 'white',
            }}
        />
        <TextField
            label="Password"
            variant="filled"
            className="w-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                backgroundColor: 'white',
            }}
        />
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleLogin}
        >
            Login
        </Button>
    </form>
}


