import {configureStore, createSlice} from "@reduxjs/toolkit";

const initState = {
    movies: [],
    selectedDate: new Date().toISOString(),
    selectedMovie: null,
    selectedScreening: null,
    currentDay: 1,
    bookings: {student: 0, adult: 0, pension: 0},
    bookingsCount: 0,
    totalPrice: 0,
    selectedSeats: [],
    myBookings: [],
    days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
};

const appSlice = createSlice({
    name: "app",
    initialState: initState,
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        setSelectedScreening: (state, action) => {
            state.selectedScreening = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setCurrentDay: (state, action) => {
            state.currentDay = action.payload;
            state.selectedMovie = null;
            state.selectedScreening = null;
            state.bookings = {student: 0, adult: 0, pension: 0};
            state.bookingsCount = 0;
            state.selectedSeats = [];
        },
        incrementBooking: (state, action) => {
            const bookingType = action.payload;
            state.bookings[bookingType] = state.bookings[bookingType] + 1;
            state.bookingsCount = state.bookingsCount + 1;
        },
        decrementBooking: (state, action) => {
            const bookingType = action.payload;
            if (state.bookings[bookingType] !== 0) {
                state.bookings[bookingType] = state.bookings[bookingType] - 1;
                state.bookingsCount = state.bookingsCount - 1;
            }
        },
        resetBookings: (state) => {
            state.bookings = {student: 0, adult: 0, pension: 0};
            state.selectedSeats = [];
            state.bookingsCount = 0;
            state.totalPrice = 0;
            state.selectedMovie = null;
            state.selectedScreening = null;
        },
        selectSeat: (state, action) => {
            state.selectedSeats.push(action.payload);
        },
        removeSelectedSeat: (state, action) => {
            const ind = state.selectedSeats.findIndex(
                (s) => s.seat === action.payload.seat && s.row === action.payload.row
            );
            state.selectedSeats.splice(ind, 1);
        },
        finalizeBookings: (state) => {
            state.bookings = {student: 0, adult: 0, pension: 0};
            state.bookingsCount = 0;
            state.selectedSeats = [];
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setMyBookings(state, action) {
            state.myBookings = action.payload;
        }
    },
});

export const {
    setSelectedMovie,
    setSelectedScreening,
    setCurrentDay,
    resetBookings,
    decrementBooking,
    selectSeat,
    incrementBooking,
    removeSelectedSeat,
    setMovies,
    setSelectedDate,
    setMyBookings

} = appSlice.actions;
export const selectSelectedMovie = (state) => state.app.selectedMovie;
export const selectSelectedScreening = (state) => state.app.selectedScreening;
export const selectCurrentDay = (state) => state.app.currentDay;
export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});

