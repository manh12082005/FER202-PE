export default function MovieItem({ movie }) {
    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <div className="movie-meta">
                <span>{movie.genre}</span>
                <span>{movie.year}</span>
            </div>
            <p className="movie-rating">Rating {movie.rating}</p>
        </div>
    );
}
