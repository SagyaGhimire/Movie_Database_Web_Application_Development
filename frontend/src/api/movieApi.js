import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

const normalizeToken = (token) => {
    if (!token || token === 'undefined' || token === 'null') {
        return null;
    }
    return token.toString().trim();
};

api.interceptors.request.use((config) => {
    const token = normalizeToken(localStorage.getItem('token'));
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common.Authorization;
        }
        return Promise.reject(error);
    }
);

export function setAuthToken(token) {
    const normalized = normalizeToken(token);
    if (normalized) {
        api.defaults.headers.common.Authorization = `Bearer ${normalized}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

export function getAllMovies(filters = {}) {
    return api.get('/api/movies', { params: filters })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching movies:', error);
            throw error;
        });
}

export function addMovie(movieData) {
    return api.post('/api/movies', movieData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding movie:', error);
            throw error;
        });
}

export function getMovieById(movieId) {
    return api.get(`/api/movies/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching movie with ID ${movieId}:`, error);
            throw error;
        });
}

export function updateMovie(movieId, updatedData) {
    return api.put(`/api/movies/${movieId}`, updatedData)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error updating movie with ID ${movieId}:`, error);
            throw error;
        });
}

export function deleteMovie(movieId) {
    return api.delete(`/api/movies/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error deleting movie with ID ${movieId}:`, error);
            throw error;
        });
}

export function getWatchlist() {
    return api.get('/api/watchlist')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching watchlist:', error);
            throw error;
        });
}

export function addToWatchlist(movieId) {
    return api.post(`/api/watchlist/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error adding movie with ID ${movieId} to watchlist:`, error);
            throw error;
        });
}

export function removeFromWatchlist(movieId) {
    return api.delete(`/api/watchlist/${movieId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error removing movie with ID ${movieId} from watchlist:`, error);
            throw error;
        });
}

export function registerUser(userData) {
    return api.post('/auth/register', userData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error registering user:', error);
            throw error;
        });
}

export function loginUser(userData) {
    return api.post('/auth/login', userData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
}

export function addReview(movieId, reviewData) {
    return api.post(`/api/movies/${movieId}/reviews`, reviewData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding review:', error);
            throw error;
        });
}
       