import {createBrowserRouter} from "react-router";
import App from "./App.jsx";
import {LoginPage} from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import MyBookings from "./pages/MyBookings/index.jsx";
import ManageFilms from "./pages/ManageFilms/index.jsx";
import Home from "./pages/Home/index.jsx";
import Movies from "./pages/Movies/index.jsx";
import AddMovie from "./features/AddMovie/index.jsx";
import AddScreening from "./features/AddScreening/index.jsx";

export const router = createBrowserRouter([
    {
        path: "/", exact: true, name: "Home", Component: Home, children: [
            {path: "/", exact: true, name: "Movies", Component: Movies},
            {
                path: "manage-films", exact: true, name: "Manage Films", Component: ManageFilms,
            },
            {path: "manage-films/add-screening", name: "Add Booking", Component: AddScreening},
            {path: "manage-films/add-movie", name: "Add Booking", Component: AddMovie},
            {path: "my-bookings", exact: true, name: "My Bookings", Component: MyBookings},
            {path: "/login", exact: true, name: "Login", Component: LoginPage},
            {path: "/register", exact: true, name: "Register", Component: Register},
        ]
    },
])