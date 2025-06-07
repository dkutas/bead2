import {Grid} from "@mui/material";
import {Booking} from "./Booking";
import {useEffect} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedScreening} from "../../store/store";

export const MovieContent = () => {
    const movie = useSelector(state => state.app.movies.find(movie => movie.id === state.app.selectedMovie));
    const dispatch = useDispatch();
    const selectedScreening = useSelector((state) => state.app.selectedScreening);
    const currentDay = useSelector((state) => state.app.currentDay);
    useEffect(() => {
        dispatch(setSelectedScreening(null));
    }, [movie, dispatch]);
    console.log(movie)
    console.log(useSelector(state => state.app.currentDay));
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container xs={3} sm={3} md={3}>
                <Grid item xs={3} sm={3} md={3} size={3}>
                    <img
                        style={{
                            borderRadius: "24px",
                            rotate: "-5.1deg",
                            border: "6.5px solid #27272A",
                        }}
                        src={movie?.image_path}
                        alt={movie?.description}
                    />
                </Grid>
                <Grid
                    item
                    xs={9}
                    sm={9}
                    md={9}
                    size={9}
                    gap={"9px"}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "#A1A1AA",
                    }}
                >
                    <h1
                        style={{
                            verticalAlign: "middle",
                            fontSize: "36px",
                            color: "#FAFAFA",
                        }}
                    >
                        {movie.title}
                    </h1>
                    <h2>{movie.release_year}</h2>
                    <h2>{movie.description}</h2>
                    <div className="flex flex-row gap-2">
                        {movie?.screenings?.filter((screening) => screening.week_day === currentDay)
                            .sort(
                                (a, b) =>
                                    new Date(`1970-01-01T${a.start_time}`) -
                                    new Date(`1970-01-01T${b.start_time}`)
                            )?.map((screening) => {
                                const classes = classNames(
                                    "px-1 py-0.5",
                                    "rounded-lg",
                                    "text-gray-50 border-2 border-gray-100",
                                    "hover:bg-lime-500 cursor-pointer hover:text-gray-900 hover:border-transparent",
                                    "active:bg-lime-500 active:text-gray-900 active:border-transparent",
                                    {active: selectedScreening === screening.id}
                                );
                                return (
                                    <div
                                        key={screening.id}
                                        className={classes}
                                        onClick={() => {
                                            dispatch(setSelectedScreening(screening.id));
                                        }}
                                    >
                                        {screening.start_time}
                                    </div>
                                );
                            })}
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
                {selectedScreening ? (
                    <div>
                        <Booking
                            selectedScreening={movie.screenings.find(
                                (screening) => screening.id === selectedScreening
                            )}
                            selectedMovie={movie}
                        />
                    </div>
                ) : null}
            </Grid>
        </Grid>
    );
};
