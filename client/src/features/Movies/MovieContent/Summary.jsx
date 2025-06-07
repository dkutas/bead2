import {Grid, Snackbar, Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {resetBookings, setMovies} from "../../store/store";
import {Dialog, Button} from "@mui/material";
import {useState, useContext} from "react";
import {ApiService} from "../../../services/api.service.js";
import {getWeek} from "date-fns";
import {SnackBarContext} from "../../../contexts/SnackBarContext.jsx"

const Summary = ({movie, screening, needFinalize}) => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const mapper = {adult: "Felnőtt", student: "Diák", pension: "Nyugdíjas"};
    const bookings = useSelector((state) => state.app.bookings);
    const currentDay = useSelector(
        (state) => state.app.days[state.app.currentDay]
    );
    const {setSnackbar} = useContext(SnackBarContext);
    const selectedWeek = getWeek(new Date(useSelector((state) => state.app.selectedDate)), {weekStartsOn: 1});


    const mapToPostValue = (category) => {
        switch (category) {
            case "adult":
                return "normal";
            case "student":
                return "student";
            case "pension":
                return "student";
            default:
                return "normal";
        }
    }
    const costs = {adult: 2500, student: 2000, pension: 1800};
    const selectedSeats = useSelector((state) => state.app.selectedSeats);


    const finalizeBooking = async () => {
        const valueToPost = {
            screening_id: screening.id,
            seats: selectedSeats.map((seat) => ({row: seat.seat, number: seat.row})),
            ticket_types: Object.entries(bookings)?.filter(([, number]) => number > 0)
                ?.map(([category, number]) => ({
                    type: mapToPostValue(category),
                    quantity: number
                }))
        };

        try {
            await ApiService.getInstance().post("bookings", valueToPost);
            setSnackbar({
                open: true,
                message: 'Foglalás sikeresen létrehozva!',
                severity: 'success'
            });
            dispatch(resetBookings());
            setOpen(false);

            const movies = await ApiService.getInstance()
                .get(`movies/week?week_number=${selectedWeek}`);
            dispatch(setMovies(movies));
        } catch (error) {
            console.error("Booking failed:", error);
            setSnackbar({
                open: true,
                message: 'Hiba történt a foglalás során!',
                severity: 'error'
            });
        }

    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="p-6 min-w-[400px]">
                    <h2 className="text-2xl mb-4">Foglalás megerősítése</h2>
                    <div className="border-b pb-4 mb-4">
                        <div className="font-bold">{movie.title}</div>
                        <div className="text-gray-600">{currentDay}</div>
                    </div>
                    <div className="space-y-2 border-b pb-4 mb-4">
                        {Object.entries(bookings).map(([key, value]) => {
                            if (value === 0) return null;
                            return (
                                <div className="flex justify-between" key={key}>
                                    <span>{value}x {mapper[key]}</span>
                                    <span>{costs[key] * bookings[key]} Ft</span>
                                </div>
                            );
                        })}
                        <div className="flex justify-between font-bold pt-2">
                            <span>Összesen:</span>
                            <span>
                    {Object.entries(bookings).reduce(
                        (acc, [key, value]) => acc + costs[key] * value,
                        0
                    )} Ft
                </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="font-bold mb-2">Kiválasztott helyek:</div>
                        <div className="text-gray-600">
                            {selectedSeats
                                .map((seat) => `${seat.seat}.sor ${seat.row}. szék`)
                                .join(", ")}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button
                            className="px-4 py-2 rounded-lg border"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Mégsem
                        </Button>
                        <Button
                            className="px-4 py-2 rounded-lg bg-[#84cc16] text-black"
                            onClick={() => {
                                finalizeBooking();
                            }}
                        >
                            Foglalás
                        </Button>
                    </div>
                </div>
            </Dialog>
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
                {
                    needFinalize ?
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
                                    setOpen(true);
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
                        </Grid> : null
                }
            </Grid>
        </>
    );
};

export default Summary;
