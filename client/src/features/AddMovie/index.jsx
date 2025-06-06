import {useEffect, useState} from "react";
import {TextField, Button, Container, Paper, Typography, MenuItem} from "@mui/material";
import {ApiService} from "../../services/api.service.js";
import {useNavigate} from "react-router";
import {useLocation} from "react-router";

export default function AddMovie() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        genre: "",
        release_year: "",
        image_path: ""
    });
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const movieId = +location.search.split("=")[1];

    useEffect(() => {
        if (movieId) {
            ApiService.getInstance().get(`movies/${movieId}`).then((response) => {
                setFormData({
                    title: response.title,
                    description: response.description,
                    duration: response.duration,
                    genre: response.genre,
                    release_year: response.release_year,
                    image_path: response.image_path
                });
            }).catch((error) => {
                console.error("Error fetching movie details:", error);
            });
        }
    }, [])

    const genres = [
        "Action", "Comedy", "Drama", "Horror", "Sci-Fi",
        "Thriller", "Romance", "Documentary", "Animation"
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ""}));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.duration) newErrors.duration = "Duration is required";
        if (!formData.genre) newErrors.genre = "Genre is required";
        if (!formData.release_year) newErrors.year = "Year is required";
        if (!formData.image_path) newErrors.image_url = "Image URL is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (movieId) {
                await ApiService.getInstance().put(`movies/${movieId}`, formData);
            } else {
                await ApiService.getInstance().post("movies", formData);
            }
            navigate("/manage-films");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    return (
        <Container maxWidth="sm" className="mt-8">
            <Paper elevation={3} className="p-8">
                <Typography variant="h4" className="mb-4 text-center">
                    Add New Movie
                </Typography>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Movie Title"
                        name="title"
                        variant="filled"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
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
                    />
                    <TextField
                        label="Description"
                        name="description"
                        variant="filled"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
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
                    />
                    <TextField
                        label="Duration (minutes)"
                        name="duration"
                        variant="filled"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        error={!!errors.duration}
                        helperText={errors.duration}
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
                    />
                    <TextField
                        select
                        label="Genre"
                        name="genre"
                        variant="filled"
                        value={formData.genre}
                        onChange={handleChange}
                        error={!!errors.genre}
                        helperText={errors.genre}
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
                        {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>
                                {genre}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Year"
                        name="release_year"
                        variant="filled"
                        type="number"
                        value={formData.release_year}
                        onChange={handleChange}
                        error={!!errors.year}
                        helperText={errors.year}
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
                    />
                    <TextField
                        label="Image URL"
                        name="image_path"
                        variant="filled"
                        value={formData.image_path}
                        onChange={handleChange}
                        error={!!errors.image_url}
                        helperText={errors.image_url}
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
                    />
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
                        Add Movie
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}