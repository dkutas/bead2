import {useState, useEffect} from "react";
import {TextField, Button, Container, Paper, Typography, MenuItem} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {ApiService} from "../../services/api.service.js";
import {useNavigate} from "react-router";
import dayjs from 'dayjs';

export default function AddBooking() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        movie_id: "",
        room: "",
        date: null,
        start_time: null
    });
    const [errors, setErrors] = useState({});

    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                await ApiService.getInstance().get("movies").then((response) => {
                    setMovies(response);
                });
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ""}));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.movie_id) newErrors.movie_id = "Movie is required";
        if (!formData.room) newErrors.room = "Room is required";
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.start_time) newErrors.start_time = "Start time is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formattedData = {
                ...formData,
                date: dayjs(formData.date).format('YYYY-MM-DD'),
                start_time: dayjs(formData.start_time).format('HH:mm')
            };

            await ApiService.getInstance().post("screenings", formattedData);
            navigate("/manage-films");
        } catch (error) {
            console.error("Error adding screening:", error);
        }
    };
    console.log(movies)
    return (
        <Container maxWidth="sm" className="mt-8">
            <Paper elevation={3} className="p-8">
                <Typography variant="h4" className="mb-4 text-center">
                    Add New Screening
                </Typography>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        select
                        label="Movie"
                        name="movie_id"
                        variant="filled"
                        value={formData.movie_id}
                        onChange={handleChange}
                        error={!!errors.movie_id}
                        helperText={errors.movie_id}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'white',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'white',
                                }
                            }
                        }}
                    >
                        {movies && movies.map((movie) => (
                            <MenuItem key={movie.id} value={movie.id}>
                                {movie.title}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Room"
                        name="room"
                        variant="filled"
                        value={formData.room}
                        onChange={handleChange}
                        error={!!errors.room}
                        helperText={errors.room}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'white',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'white',
                                }
                            }
                        }}
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room} value={room}>
                                {room}
                            </MenuItem>
                        ))}
                    </TextField>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={formData.date}
                            onChange={(newValue) => {
                                setFormData(prev => ({...prev, date: newValue}));
                                setErrors(prev => ({...prev, date: ""}));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            )}
                        />

                        <TimePicker
                            label="Start Time"
                            value={formData.start_time}
                            onChange={(newValue) => {
                                setFormData(prev => ({...prev, start_time: newValue}));
                                setErrors(prev => ({...prev, start_time: ""}));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    error={!!errors.start_time}
                                    helperText={errors.start_time}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        type="submit"
                        className="mt-4"
                        sx={{
                            backgroundColor: '#84cc16',
                            '&:hover': {
                                backgroundColor: '#65a30d'
                            }
                        }}
                    >
                        Add Screening
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}