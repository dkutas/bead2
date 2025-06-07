import {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {AuthService} from "../../services/auth.service.js";
import {useNavigate} from "react-router";
import {AuthContext} from "../../contexts/AuthContext.jsx";

export default function Register() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [errors, setError] = useState([]);
    const {setIsAuthenticated} = useContext(AuthContext); // Add this


    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.getInstance().register({
                email,
                name,
                password,
                password_confirmation: passwordAgain
            }).then(() => {
                setIsAuthenticated(true)
                navigate("/");
            })
        } catch (err) {
            setError(err);
        }
    }

    return <div
        className="flex flex-col items-center gap-3 justify-center rounded-xl px-[227px] py-[44px] text-white">
        <h2 className="text-[36px] font-[700]">
            Register
        </h2>
        <TextField
            sx={{
                backgroundColor: 'white',
            }}
            variant="filled" label="E-mail" className="w-lg" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
        <TextField
            sx={{
                backgroundColor: 'white',
            }}
            variant="filled" label="Name" className="w-lg" type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
        <TextField
            sx={{
                backgroundColor: 'white',
            }}
            variant="filled" label="Password" className="w-lg" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
        <TextField
            sx={{
                backgroundColor: 'white',
            }}
            variant="filled" label="Password again" error={errors.length > 0} className="w-lg" type="password"
            value={passwordAgain}
            helperText={errors.join(" ")}
            onChange={(e) => setPasswordAgain(e.target.value)} required/>
        <Button
            variant="contained" color="primary" type="submit"
            onClick={handleRegister}>Register</Button>
    </div>
}