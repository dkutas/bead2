import {Grid} from "@mui/material";
import {MoviePicker} from "./MoviePicker/MoviePicker";
import {MovieContent} from "./MovieContent/MovieContent";
import {useDispatch, useSelector} from "react-redux";
import {ApiService} from "../../services/api.service.js";
import {setMovies} from "../store/store.js";
import {useEffect} from "react";
import {getWeek} from "date-fns";

export const Main = () => {
    const dispatch = useDispatch();
    const selectedWeek = getWeek(new Date(useSelector((state) => state.app.selectedDate)), {weekStartsOn: 1});

    useEffect(() => {
        // Fetch movies from the API and dispatch them to the store
        ApiService.getInstance()
            .get(`movies/week?week_number=${selectedWeek}`)
            .then((movies) => {
                dispatch(setMovies(movies));
            }).catch((error) => {
            dispatch(setMovies([]));
        })
    }, [dispatch, selectedWeek]);

    const selectedMovie = useSelector((state) => state.app.selectedMovie);

    return (
        <Grid container className="text-[#f0f0f0] p-[24px] mt-[18px] xs:flex-row">
            <Grid item xs={12} size={6} sm={12} md={12}>
                <MoviePicker/>
            </Grid>
            <Grid item xs={12} size={6} sm={12} md={12}>
                {selectedMovie ? <MovieContent/> : null}
            </Grid>
        </Grid>
    );
};
