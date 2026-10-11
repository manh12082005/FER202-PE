export default function Header({ totalMovies }) {
    return (
        <header className="header">
            <div>
                <h1>Mini Movie Manager</h1>
                <p className="result-count">{totalMovies} movies found</p>
            </div>
        </header>
    );
}
