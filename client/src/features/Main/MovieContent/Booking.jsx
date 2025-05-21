import {Grid} from "@mui/material";
import freeSeat from "./../../../assets/freeseat.svg"; // Replace with your logo path
import selectedSeat from "./../../../assets/selectedseat.svg"; // Replace with your logo path
import takenSear from "./../../../assets/takenseat.svg"; // Replace with your logo path
import {Counter} from "./utils/Counter";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {removeSelectedSeat, selectSeat} from "../../movies/store";
import Summary from "./Summary";

export const Booking = ({selectedScreening, selectedMovie: movie}) => {
    const bookingsCount = useSelector((state) => state.app.bookingsCount);
    const selectedSeats = useSelector((state) => state.app.selectedSeats);


    const costs = {adult: 2500, student: 2000, pension: 1800};

    const dispatch = useDispatch();

    const bookings = useSelector((state) => state.app.bookings);
    return (
        <>
            <Grid
                container
                direction="row"
                wrap="nowrap"
                className="border-2 border-[#FAFAFA33] rounded-2xl backdrop-blur-[90.8px] p-4"
            >
                <Grid
                    size={5}
                    item
                    container
                    direction="column"
                    className="border-r-2 border-[#FAFAFA33] justify-between"
                >
                    <div className="flex flex-col gap-2 ">
                        <Grid
                            item
                            container
                            wrap="nowrap"
                            sx={{height: "45px"}}
                            justifyContent="space-between"
                        >
                            <div>
                                <h1>Diák</h1>
                                <h2
                                    style={{
                                        color: "#A1A1AA",
                                        fontWeight: "400",
                                        fontSize: "9.52px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    2000 Ft
                                </h2>
                            </div>
                            <div className="pr-2">
                                <Counter type="student"/>
                            </div>
                        </Grid>
                        <Grid
                            item
                            container
                            wrap="nowrap"
                            justifyContent="space-between"
                            sx={{height: "45px"}}
                        >
                            <div>
                                <h1>Felnőtt</h1>
                                <h2
                                    style={{
                                        color: "#A1A1AA",
                                        fontWeight: "400",
                                        fontSize: "9.52px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    2500 Ft
                                </h2>
                            </div>
                            <div className="pr-2">
                                <Counter type="adult"/>
                            </div>
                        </Grid>
                        <Grid
                            container
                            item
                            justifyContent="space-between"
                            sx={{height: "45px"}}
                            wrap="nowrap"
                        >
                            <div>
                                <h1>Nyugdíjas</h1>
                                <h2
                                    style={{
                                        color: "#A1A1AA",
                                        fontWeight: "400",
                                        fontSize: "9.52px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    1800 Ft
                                </h2>
                            </div>
                            <div className="pr-2">
                                <Counter type="pension"/>
                            </div>
                        </Grid>
                        <Grid
                            container
                            item
                            justifyContent="space-between"
                            sx={{height: "45px"}}
                        >
                            <div>
                                <h1>Összesen:</h1>
                            </div>
                            <div className="pr-2">
                                <h1>
                                    {Object.keys(bookings).reduce(
                                        (acc, key) => acc + costs[key] * bookings[key],
                                        0
                                    )}
                                    {" Ft"}
                                </h1>
                            </div>
                        </Grid>
                        {bookingsCount > 0 ? (
                            <>
                                <div className="text-center">
                                    <h1>Válaszd ki az ülőhelyeket!</h1>
                                </div>
                                <div className="flex items-center justify-center">
                                    <h1>
                                        {`${selectedSeats.length}/${bookingsCount}`} kiválasztva
                                    </h1>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div>
                        {selectedSeats.length === bookingsCount && bookingsCount > 0 ? (
                            <div className="flex justify-center"></div>
                        ) : null}
                    </div>
                </Grid>
                <Grid
                    size={8}
                    item
                    container
                    gap={1}
                    width={"100%"}
                    // className="p-2"
                    justifyContent="center"
                    alignItems="center"
                    wrap="nowrap"
                >
                    {[...new Array(selectedScreening?.room?.rows)].map((_, row) => {
                        return (
                            <Grid
                                item
                                key={`row-${row}`}
                                xs={2}
                                sm={2}
                                md={2}
                                gap={2}
                                justifyContent="center"
                                alignItems={"center"}
                                wrap="nowrap"
                            >
                                {[...new Array(selectedScreening?.room?.seatsPerRow)].map(
                                    (_, seat) => {
                                        const isBooked = selectedScreening?.bookings?.find(
                                            (booking) =>
                                                booking.row === row + 1 && booking.seat === seat + 1
                                        );
                                        const isSelected = selectedSeats.find(
                                            (selected) =>
                                                selected.row === row + 1 && selected.seat === seat + 1
                                        );
                                        const src = isBooked
                                            ? takenSear
                                            : isSelected
                                                ? selectedSeat
                                                : freeSeat;

                                        const onClick = () => {
                                            if (!isSelected && bookingsCount > selectedSeats.length) {
                                                dispatch(selectSeat({row: row + 1, seat: seat + 1}));
                                            } else if (isSelected) {
                                                dispatch(
                                                    removeSelectedSeat({row: row + 1, seat: seat + 1})
                                                );
                                            }
                                        };
                                        const cs = classNames("w-13 h-13", {
                                            "cursor-pointer": !isBooked,
                                        });
                                        return (
                                            <img
                                                style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                }}
                                                key={`seat-${row}-${seat}`}
                                                className={cs}
                                                onClick={isBooked ? null : onClick}
                                                src={`${src}`}
                                                alt="seat"
                                            />
                                        );
                                    }
                                )}
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
            {!selectedSeats ||
            !bookingsCount ||
            selectedSeats.length < bookingsCount ? null : (
                <Summary movie={movie} screening={selectedScreening}/>
            )}
        </>
    );
};
