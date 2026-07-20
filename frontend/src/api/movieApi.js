import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001/movies/', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export function getAllMovies() {
    return api.get('/')
        .then(response => response.data)
        .catch(error => {   
        console.error('Error fetching movies:', error);
        throw error;
    });
}

export function addMovie(movieData) {
    return api.post('/', movieData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding movie:', error);
            throw error;
        });
}

export function getMovieById(movieId) {
    return api.get(`/${movieId}`)
        .then(response => response.data)    
    .catch(error => {
        console.error(`Error fetching movie with ID ${movieId}:`, error);
        throw error;
    });
}

export function updateMovie(movieId, updatedData) {
    return api.put(`/${movieId}`, updatedData)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error updating movie with ID ${movieId}:`, error);
            throw error;
        });
}

export function deleteMovie(movieId) {
    return api.delete(`/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error deleting movie with ID ${movieId}:`, error);
            throw error;
        });
}

export function getWatchlist() {
    return api.get('/watchlist')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching watchlist:', error);
            throw error;
        });
}

export function addToWatchlist(movieId) {
    return api.post(`/watchlist/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error adding movie with ID ${movieId} to watchlist:`, error);
            throw error;
        });
}

export function removeFromWatchlist(movieId) {
    return api.delete(`/watchlist/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error removing movie with ID ${movieId} from watchlist:`, error);
            throw error;
        });
    }
    