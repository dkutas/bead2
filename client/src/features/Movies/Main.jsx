import {Grid} from "@mui/material";
import {MoviePicker} from "./MoviePicker/MoviePicker";
import {MovieContent} from "./MovieContent/MovieContent";
import {useDispatch, useSelector} from "react-redux";
import {ApiService} from "../../services/api.service.js";
import {setMovies} from "../store/store.js";

export const Main = () => {

    const dispatch = useDispatch()
    ApiService.getInstance().get("movies").then((movies) => {
        dispatch(setMovies(movies));

    })
    const selectedMovie = useSelector((state) => state.app.selectedMovie);

    return (
        <Grid container className="text-[#f0f0f0] p-[24px] mt-[18px] xs:flex-row">
            <Grid item xs={12} size={6} sm={12} md={12}>
                <MoviePicker/>
            </Grid>
            <Grid item xs={12} size={6} sm={12} md={12}>
                {selectedMovie ? (
                    <MovieContent/>
                ) : null}
            </Grid>
        </Grid>
    );
};
