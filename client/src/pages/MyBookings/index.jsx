import {ApiService} from "../../services/api.service.js";
import {useEffect} from "react";
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setMyBookings} from "../../features/store/store.js";

export default function MyBookings() {
    const dispatch = useDispatch();
    useEffect(() => {
        ApiService.getInstance().get("bookings").then((response) => {
            dispatch(setMyBookings(response));
        })
    }, []);
    const mapper = {normal: "Felnőtt", student: "Diák"};
    const myBookings = useSelector((state) => state.app.myBookings);
    const bookings = {};
    
    return <div className="p-5 m-8">
        <h1 className="text-4xl p-3 text-white">Foglalásaim</h1>
        <h2 className="text-3xl p-3 text-white mt-8">Közelgő foglalások</h2>
        <div>
            {myBookings.filter(booking => new Date(booking.screening.start_time) > new Date()).map((booking) => (<Grid
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
                        <h1 className="text-2xl ">{booking.screening.movie.title}</h1>
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
                            {booking.screening.date}
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
            </Grid>))
            }
        </div>
        <h2 className="text-3xl p-3 text-white">Elmúlt foglalások foglalások</h2>
    </div>

}