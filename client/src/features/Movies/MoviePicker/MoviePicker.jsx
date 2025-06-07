import {Box, Button, Grid} from "@mui/material";
import {MovieCard} from "./MovieCard";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {Navitem} from "../../NavBar/NavItem.jsx";
import "./movieDayBar.css";
import {getWeek, addDays, startOfWeek} from "date-fns";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {setSelectedDate} from "../../store/store.js";
import {sub, add, format} from "date-fns";

export const MoviePicker = () => {
    const movies = useSelector((state) => state.app.movies);
    const day = useSelector((state) => state.app.currentDay);
    const currentDay = useSelector((state) => state.app.currentDay);
    const selectedDate = new Date(useSelector((state) => state.app.selectedDate));
    const dispatch = useDispatch();

    const weekStart = startOfWeek(selectedDate, {weekStartsOn: 1});
    const days = [...Array(7)].map((_, i) => {
        return addDays(weekStart, i);
    });


    const handleDayChange = (plusMinus) => {
        let dateToSet = selectedDate;
        if (plusMinus === -1) {
            dateToSet = sub(selectedDate, {weeks: 1});
        } else {
            selectedDate
            dateToSet = add(selectedDate, {weeks: 1});
        }
        dispatch(setSelectedDate(dateToSet.toISOString()));
    };


    return (
        <>
            <div className="navbar__container">
                <ul className="navbar__links">
                    {days.map((day, index) => {
                        const actualClassNames = classNames({
                            leftlink: index === 0,
                            rightlink: index === 6,
                            active: currentDay === index + 1,
                        });

                        return (
                            <Navitem
                                key={index}
                                classNames={actualClassNames}
                                day={day}
                                index={index}
                            />
                        );
                    })}
                </ul>
                <div className="week__selector">
                    <Button onClick={() => handleDayChange(-1)}>
                        <ChevronLeft/>
                    </Button>
                    <div className="text-2xl">{`${getWeek(selectedDate, {weekStartsOn: 1})}. week`}</div>
                    <Button onClick={() => handleDayChange(1)}>
                        <ChevronRight/>
                    </Button>
                </div>
            </div>
            <Grid
                style={{alignItems: "center"}}
                container
                direction="column"
                spacing={2}
            >
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
                    {format(days[day - 1], 'EEEE')}
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
                            ?.filter((movie) => {
                                    return movie?.screenings?.some(
                                        (screening) => screening?.week_day === day
                                    )
                                }
                            )
                            ?.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};