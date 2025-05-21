import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {resetBookings} from "../../movies/store";

const Summary = ({movie, screening}) => {
    const movies = useSelector(state => state.app.movies);
    const dispatch = useDispatch();
    const mapper = {adult: "Felnőtt", student: "Diák", pension: "Nyugdíjas"};
    const bookings = useSelector((state) => state.app.bookings);
    const currentDay = useSelector(
        (state) => state.app.days[state.app.currentDay]
    );
    const costs = {adult: 2500, student: 2000, pension: 1800};
    const selectedSeats = useSelector((state) => state.app.selectedSeats);

    const finalizeBooking = () => {
        const movieIndex = movies.findIndex((m) => m.id === movie.id);
        const selectedScreeningIndex = movies[movieIndex].screenings.findIndex(
            (s) => s.id === screening.id
        );
        console.log(movies[movieIndex].screenings[selectedScreeningIndex].bookings);
        selectedSeats.forEach((seat) => {
            movies[movieIndex].screenings[selectedScreeningIndex].bookings.push({
                seat: seat.seat,
                row: seat.row,
            });
        });

        dispatch(resetBookings());

        console.log(movies[movieIndex].screenings[selectedScreeningIndex].bookings);

        // Logic to finalize the booking
        // This could involve sending the booking data to a server or updating the state
        // For now, we'll just log the booking data
        console.log("Booking finalized:", {
            movie,
            bookings,
            selectedSeats,
        });
    };

    return (
        <Grid
            container
            item
            direction="row"
            className="border-2 border-[#FAFAFA33] rounded-2xl backdrop-blur-[90.8px] p-4 mt-4"
        >
            <Grid
                item
                container
                size={6}
                direction="column"
                className="justify-between"
                sx={{paddingBottom: "10px"}}
            >
                <Grid sx={{paddingBottom: "10px"}} className="px-2">
                    <h1 className="text-2xl ">{movie.title}</h1>
                    <h2
                        style={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#A1A1AA",
                        }}
                    >
                        {currentDay}
                    </h2>
                </Grid>
                <div className="border-b-2 border-[#FAFAFA33] p-2 text-[#A1A1AA]">
                    {Object.entries(bookings).map(([key, value]) => {
                        if (value === 0) return null;

                        return (
                            <div className="flex justify-between" key={key}>
                                <Grid>
                                    {value}x {mapper[key]}
                                </Grid>
                                <Grid className="pr-2">{costs[key] * bookings[key]}Ft</Grid>
                            </div>
                        );
                    })}
                </div>
                <div className="text-[#A1A1AA] border-b-2 border-[#FAFAFA33] ">
                    <div className="p-2">Helyek</div>

                    <div className="p-2 inline-block">
                        {selectedSeats
                            .map((seat) => `${seat.seat}.sor ${seat.row}. szék`)
                            .join(", ")}
                    </div>
                </div>
            </Grid>
            <Grid
                item
                container
                size={6}
                direction="column"
                className="justify-center items-end"
            >
                <Grid
                    item
                    onClick={() => {
                        finalizeBooking();
                    }}
                    sx={{
                        borderRadius: "20px",
                        paddingY: "10px",
                        paddingX: "31px",
                        backgroundColor: "#84cc16",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        color: "#1E1E1E",
                        width: "fit-content",
                        cursor: "pointer",
                    }}
                >
                    Foglalás véglegesítése
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Summary;
