import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import minus from "./../../../../assets/minus.svg"; // Replace with your logo path
import plusz from "./../../../../assets/plus.svg"; // Replace with your logo path
import { decrementBooking, incrementBooking } from "../../../movies/store";

export const Counter = ({ type }) => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.app.bookings);
  return (
    <Grid container direction="row" gap={1} alignItems="center" wrap="nowrap">
      <img
        className="cursor-pointer"
        src={`${minus}`}
        onClick={() => dispatch(decrementBooking(type))}
        alt="seat"
        style={{
          width: "30px",
          height: "30px",
        }}
      />
      <input
        type="text"
        style={{
          border: "0.5px solid #84CC16",
          width: "30px",
          height: "30px",
        }}
        value={bookings[type]}
        disabled
        className="text-center border-2 rounded-lg backdrop-blur-[90.8px]"
      />
      <img
        className="cursor-pointer"
        src={`${plusz}`}
        onClick={() => dispatch(incrementBooking(type))}
        alt="seat"
        style={{
          width: "30px",
          height: "30px",
        }}
      />
    </Grid>
  );
};
