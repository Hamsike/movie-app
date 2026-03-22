import axios from 'axios';
import { API_CONFIG } from '../api/config';
import type { MoviesResponse, Filters } from '../types';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_CONFIG.apiKey
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
      return Promise.reject(new Error(message));
    }

    if (status === 401) {
      const message = data?.message || 'Доступ запрещён';
      return Promise.reject(new Error(message));
    }
    
    if (status === 400) {
      console.error('Bad request:', data);
      return Promise.reject(new Error('Неверный формат фильтров'));
    }
    
    return Promise.reject(error);
  }
);

let genresCache: string[] | null = null;

export const movieService = {
  getMovies: async (page = 1, filters?: Filters): Promise<MoviesResponse> => {
    const params: any = {
      page,
      limit: API_CONFIG.defaultParams.limit,
      selectFields: API_CONFIG.defaultParams.selectFields,
      notNullFields: API_CONFIG.defaultParams.notNullFields,
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

    const response = await api.get<MoviesResponse>('/v1.4/movie', { params });
    return response.data;
  },

  getMovieById: async (id: number) => {
    const response = await api.get(`/v1.4/movie/${id}`);
    return response.data;
  },
  getGenres: async (): Promise<string[]> => {
    if (genresCache) {
      return genresCache;
    }

    try {
      const response = await api.get<MoviesResponse>('/v1.4/movie', {
        params: {
          page: 1,
          limit: 200,
          'rating.kp': '7-10',
          sortField: 'votes.kp',
          sortType: -1,
          selectFields: ['genres'],
        }
      });

      const genresSet = new Set<string>();
      response.data.docs.forEach(movie => {
        movie.genres?.forEach(genre => {
          if (genre.name && genre.name !== 'null' && genre.name !== '') {
            genresSet.add(genre.name);
          }
        });
      });

      const genres = Array.from(genresSet).sort();
      genresCache = genres;
      return genres;
      
    } catch (error) {
      return [
        'драма', 'комедия', 'боевик', 'триллер', 'фантастика',
        'ужасы', 'мелодрама', 'детектив', 'приключения', 'аниме',
        'документальный', 'криминал', 'биография', 'история', 'военный',
        'музыка', 'мюзикл', 'спорт', 'вестерн', 'семейный', 'фэнтези'
      ];
    }
  },
  clearGenresCache: () => {
    genresCache = null;
  }
};