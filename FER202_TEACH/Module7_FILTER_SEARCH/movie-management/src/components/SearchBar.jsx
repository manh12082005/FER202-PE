export default function SearchBar({ searchTerm, onSearch }) {
    return (
        <input
            className="search-input" 
            type="search"
            placeholder="Search movie titles..."
            aria-label="Search movie titles"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}
