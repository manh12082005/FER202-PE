import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import { movies as initialMovies } from './datas/movies';
import './index.css';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All Genres');

    const filteredMovies = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return initialMovies.filter((movie) => {
            const matchesTitle = movie.title.toLowerCase().includes(normalizedSearch);
            const matchesGenre = selectedGenre === 'All Genres' || movie.genre === selectedGenre;
            return matchesTitle && matchesGenre;
        });
    }, [searchTerm, selectedGenre]);

    return (
        <div className="container">
            <Header totalMovies={filteredMovies.length} />
            
            <div className="filters-bar">
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                <GenreFilter 
                    selectedGenre={selectedGenre} 
                    onGenreChange={setSelectedGenre} 
                />
            </div>
            
            <MovieList movies={filteredMovies} />
        </div>
    );
}
