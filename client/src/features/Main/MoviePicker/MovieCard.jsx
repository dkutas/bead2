import classNames from "classnames";
import "./movieCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../../movies/store";

export const MovieCard = ({ movie }) => {
  const selectedMovie = useSelector((state) => state.app.selectedMovie);
  const dispatch = useDispatch();

  const containterStyle = classNames("card-container", {
    "selected-card": selectedMovie === movie.id,
  });
  return (
    <div className={containterStyle}>
      <div
        style={{
          borderRadius: "24px",
          padding: "8px",
          width: "184px",
        }}
        key={movie.id}
        className="movie-card"
        onClick={() => {
          dispatch(setSelectedMovie(movie.id));
        }}
      >
        <img
          style={{
            borderRadius: "24px",
            objectFit: "scale-down",
          }}
          src={`/images/${movie.image}`}
          alt={movie.description}
        />
        <div style={{ padding: "4px", fontSize: "12.7px" }}>
          <h2 style={{ font: "Space Grotesk" }}>{movie.title}</h2>
          <h3
            style={{
              color: "#A1A1AA",
              fontWeight: "400",
              fontSize: "9.52px",
              verticalAlign: "middle",
            }}
          >
            {movie.genre} {movie.duration} min
          </h3>
        </div>
      </div>
    </div>
  );
};
