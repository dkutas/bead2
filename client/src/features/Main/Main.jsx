import { Grid } from "@mui/material";
import { MoviePicker } from "./MoviePicker/MoviePicker";
import { MovieContent } from "./MovieContent/MovieContent";
import movies from "../../assets/movies.json";
import { useSelector } from "react-redux";

export const Main = () => {
  const selectedMovie = useSelector((state) => state.app.selectedMovie);

  return (
    <Grid container className="text-[#f0f0f0] p-[24px] mt-[18px] xs:flex-row">
      <Grid item xs={12} size={6} sm={12} md={12}>
        <MoviePicker />
      </Grid>
      <Grid item xs={12} size={6} sm={12} md={12}>
        {selectedMovie ? (
          <MovieContent movie={movies[selectedMovie - 1]} />
        ) : null}
      </Grid>
    </Grid>
  );
};
