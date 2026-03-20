import axios from 'axios';
import { API_CONFIG } from '../api/config';
import type { MoviesResponse, Filters } from '../types';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            console.error('Network error:', error.message);
            return Promise.reject(new Error('Проблема с сетью. Проверьте подключение к интернету'));
        }

        const { status, data } = error.response;

        if (status === 403) {
            const message = data?.message || 'Лимит исчерпан';
            return Promise.reject(new Error(message))
        }

        if (status === 401) {
            const message = data?.message || 'Доступ запрещён';
            return Promise.reject(new Error(message))
        }
        return Promise.reject(error)
    }
)

export const movieService = {
  getMovies: async (page = 1, filters?: Filters): Promise<MoviesResponse> => {
    const params: any = {
      page,
      ...API_CONFIG.defaultParams,
    };

    if (filters) {
      if (filters.year) params.year = filters.year;
      if (filters.genre) params['genres.name'] = filters.genre;
      if (filters.country) params['countries.name'] = filters.country;
      if (filters.ratingFrom || filters.ratingTo) {
        params['rating.kp'] = `${filters.ratingFrom || 0}-${filters.ratingTo || 10}`;
      }
    } else {
      Object.assign(params, API_CONFIG.popularParams);
    }

    const response = await api.get<MoviesResponse>('/movie', { params });
    return response.data;
  },

  getMovieById: async (id: number) => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get('/movie/possible-values-by-field', {
      params: { field: 'genres.name' }
    });
    return response.data;
  }
};
