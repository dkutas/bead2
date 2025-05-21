import "./App.css";
import NavBar from "./features/NavBar/Navbar";
import {Main} from "./features/Main/Main";
import {Provider, useDispatch} from "react-redux";
import {ApiService} from "./services/api.service.js";
import {setMovies} from "./features/movies/store.js";

function App() {
    const dispatch = useDispatch();
    ApiService.getInstance().getAll('movies').then(data => dispatch(setMovies(data)));
    return (
        <>
            <NavBar/>
            <Main/>
        </>
    );
}

export default App;
