import {useEffect, useState} from "react";
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton, Collapse
} from "@mui/material";
import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import {ApiService} from "../../services/api.service";
import {useNavigate} from "react-router";

export default function ManageFilms() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [moviesResponse, screeningsResponse] = await Promise.all([
                ApiService.getInstance().get("movies"),
                ApiService.getInstance().get("screenings")
            ]);
            setMovies(moviesResponse);
            setScreenings(screeningsResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDeleteMovie = async (movieId) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                console.log("Deleting movie with ID:", movieId);
                await ApiService.getInstance().delete(`movies`, movieId);
                fetchData();
            } catch (error) {
                console.error("Error deleting movie:", error);
            }
        }
    };


    return (
        <Container maxWidth="xl" className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <Typography className="text-white" variant="h4">Manage Films</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={() => navigate("/manage-films/add-movie")}
                    sx={{
                        backgroundColor: '#84cc16',
                        '&:hover': {
                            backgroundColor: '#65a30d'
                        }
                    }}
                >
                    Add Movie
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Screenings</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies && movies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.genre}</TableCell>
                                <TableCell>{movie.duration} min</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            size="small"
                                            startIcon={<AddIcon/>}
                                            onClick={() => navigate("/manage-films/add-screening?movieId=" + movie.id)}
                                            sx={{alignSelf: 'flex-start'}}
                                        >
                                            Add Screening
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <IconButton
                                            onClick={() => navigate(`/manage-films/add-movie?movieId=${movie.id}`)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteMovie(movie.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}