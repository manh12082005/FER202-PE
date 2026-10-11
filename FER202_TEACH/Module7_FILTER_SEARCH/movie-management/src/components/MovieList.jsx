import MovieItem from './MovieItem';

export default function MovieList({ movies }) {
    if (movies.length === 0) {
        return <p className="empty-state">No movies match your search.</p>;
    }

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
