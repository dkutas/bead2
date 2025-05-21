import {Box, Grid} from "@mui/material";
import {MovieCard} from "./MovieCard";
import {useSelector} from "react-redux";

export const MoviePicker = () => {
    const movies = useSelector(state => state.app.movies);
    const day = useSelector((state) => state.app.currentDay);
    const days = useSelector((state) => state.app.days);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid
                item
                sx={{
                    borderRadius: "20px",
                    paddingY: "10px",
                    paddingX: "39px",
                    marginLeft: "8px",
                    backgroundColor: "#84cc16",
                    justifyContent: "center",
                    color: "#1E1E1E",
                    width: "fit-content",
                }}
            >
                {days[day - 1]}
            </Grid>
            <Grid item>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    {movies
                        .filter((movie) =>
                            movie?.screenings.some(
                                (screening) => screening.week_day === day
                            )
                        )
                        .map((movie) => <MovieCard key={movie.id} movie={movie}/>
                        )}
                </Box>
            </Grid>
        </Grid>
    );
};
