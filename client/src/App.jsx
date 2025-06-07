import "./App.css";
import {useDispatch} from "react-redux";
import {ApiService} from "./services/api.service.js";
import {setMovies} from "./features/store/store.js";
import {RouterProvider} from "react-router";
import {router} from "./routes.js";

function App() {
    const dispatch = useDispatch();
    ApiService.getInstance().get('movies').then(data => dispatch(setMovies(data)));
    return (

        <RouterProvider router={router}/>
    );
}

export default App;
