import {useEffect, useState, useContext} from "react";
import {
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import {ApiService} from "../../services/api.service";
import {useNavigate} from "react-router";
import {SnackBarContext} from "../../contexts/SnackBarContext.jsx";

export default function ManageFilms() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const {setSnackbar} = useContext(SnackBarContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const moviesResponse = await ApiService.getInstance().get("movies");
            setMovies(moviesResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDeleteMovie = async (movieId) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await ApiService.getInstance().delete(`movies`, movieId);
                fetchData();
                setSnackbar({
                    open: true,
                    message: "Movie deleted successfully",
                    severity: "success"
                });
            } catch (error) {
                console.error("Error deleting movie:", error);
                setSnackbar({
                    open: true,
                    message: "Failed to delete movie",
                    severity: "error"
                });
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
                        {movies && movies?.map((movie) => (
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