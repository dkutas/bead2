import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Typography, Paper, Grid, Box} from "@mui/material";
import {ApiService} from "../../services/api.service.js";
import {setMyBookings} from "../../features/store/store.js";
import dayjs from 'dayjs';

export default function MyBookings() {
    const dispatch = useDispatch();
    const myBookings = useSelector((state) => state.app.myBookings);
    const mapper = {normal: "Felnőtt", student: "Diák"};

    useEffect(() => {
        ApiService.getInstance().get("bookings").then((response) => {
            dispatch(setMyBookings(response));
        });
    }, [dispatch]);

    const upcomingBookings = myBookings.filter(booking =>
        new Date(booking.screening.start_time) > new Date()
    );

    const pastBookings = myBookings.filter(booking => {
            return new Date(booking.screening.start_time) <= new Date()
        }
    );

    const BookingCard = ({booking, isPast}) => (
        <Grid item xs={12} sm={6} md={4} p={5}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    height: '100%',
                    width: '100%', // Take full width of grid item
                    display: 'flex',
                    flexDirection: 'row',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(90.8px)',
                    border: '2px solid rgba(250, 250, 250, 0.2)',
                    borderRadius: '16px',
                    opacity: isPast ? 0.8 : 1,
                }}
            >
                <div className="flex flex-col justify-between mr-4 flex-nowrap" style={{width: '250px'}}>


                    <Typography variant="h5" component="h2" sx={{color: 'white', mb: 1}}>
                        {booking.screening.movie.title}
                    </Typography>

                    <Typography sx={{color: '#A1A1AA', mb: 2}}>
                        {dayjs(booking.screening.date).format('YYYY-MM-DD')} at{' '}
                        {dayjs(booking.screening.start_time).format('HH:mm')}
                    </Typography>

                    <Typography sx={{color: '#A1A1AA', mb: 1}}>
                        Room: {booking.screening.room.name}
                    </Typography>

                    <Box sx={{
                        borderTop: '1px solid rgba(250, 250, 250, 0.2)',
                        pt: 2,
                        mt: 'auto'
                    }}>
                        <Typography sx={{color: '#A1A1AA', mb: 1}}>
                            Tickets:
                        </Typography>
                        {booking.ticket_types.map(({type, quantity}) => {
                            return (quantity > 0 && (
                                <Typography
                                    key={type}
                                    sx={{color: '#A1A1AA'}}
                                >
                                    {quantity}x {mapper[type]}
                                </Typography>
                            ))
                        })}
                    </Box>
                    <Box sx={{
                        borderTop: '1px solid rgba(250, 250, 250, 0.2)',
                        pt: 2,
                        mt: 'auto'
                    }}>
                        <Typography sx={{color: '#A1A1AA', mb: 1}}>
                            Seats:
                        </Typography>
                        {booking.seats.map(({row, number}) => {
                            return (
                                <Typography
                                    key={`${row}` + `${number}`}
                                    sx={{color: '#A1A1AA'}}
                                >
                                    {row}.sor <strong>{number}.szék</strong>
                                </Typography>
                            )
                        })}
                    </Box>
                </div>
                <Box
                    component="img"
                    src={booking.screening.movie.image_path}
                    alt={booking.screening.movie.title}
                    sx={{
                        width: '300px',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        filter: isPast ? 'grayscale(100%)' : 'none',
                        transition: 'filter 0.3s ease',

                    }}
                />
            </Paper>
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{mt: 8, mb: 8}}>
            <Typography
                variant="h4"
                component="h1"
                sx={{color: 'white', mb: 4}}
            >
                My Bookings
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{color: 'white', mb: 3}}
            >
                Upcoming Bookings
            </Typography>
            <Box sx={{
                mb: 6,
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                    height: '8px'
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            }}
            >
                <Grid container wrap="nowrap" spacing={3} sx={{
                    mb: 6,
                    pr: 2,
                    width: 'max-content'
                }}>
                    {upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking}/>
                    ))}
                </Grid>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{color: 'white', mb: 3}}
            >
                Past Bookings
            </Typography>
            <Box sx={{
                mb: 6,
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                    height: '8px'
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            }}
            >
                <Grid container spacing={3}>
                    {pastBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} isPast/>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}