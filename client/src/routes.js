import {createBrowserRouter} from "react-router";
import App from "./App.jsx";
import {LoginPage} from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Movies from "./pages/Movies/index.jsx";
import MyBookings from "./pages/MyBookings/index.jsx";
import ManageFilms from "./pages/ManageFilms/index.jsx";
import Home from "./pages/Home/index.jsx";

export const router = createBrowserRouter([
    {
        path: "/", exact: true, name: "Home", Component: Home, children: [
            {path: "movies", exact: true, name: "Movies", Component: Movies},
            {path: "manage-films", exact: true, name: "Manage Films", Component: ManageFilms},
            {path: "my-bookings", exact: true, name: "My Bookings", Component: MyBookings},
        ]
    },
    {path: "/login", exact: true, name: "App", Component: LoginPage},
    {path: "/register", exact: true, name: "App", Component: Register},
])