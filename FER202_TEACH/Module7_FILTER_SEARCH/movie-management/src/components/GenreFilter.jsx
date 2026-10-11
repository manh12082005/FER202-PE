export default function GenreFilter({ selectedGenre, onGenreChange }) {
    return (
        <label className="genre-filter">
            <span>Genre</span>
            <select
                className="filter-select" 
                value={selectedGenre} 
                onChange={(e) => onGenreChange(e.target.value)}
            >
                <option value="All Genres">All Genres</option>
                <option value="Action">Action</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
            </select>
        </label>
    );
}
