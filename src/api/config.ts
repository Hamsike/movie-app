export const API_CONFIG = {
  // Для GitHub Pages используем прокси через CORS-anywhere или другой сервис
  baseURL: import.meta.env.PROD 
    ? 'https://api.kinopoisk.dev'
    : '/api',
  
  apiKey: import.meta.env.VITE_API_KEY || '',
  
  defaultParams: {
    limit: 50,
    selectFields: [
      'id', 'name', 'year', 'rating', 'poster', 
      'genres', 'countries', 'movieLength', 'ageRating',
      'description', 'shortDescription'
    ],
    notNullFields: ['name', 'poster.url', 'rating.kp']
  },
  
  popularParams: {
    'rating.kp': '7-10',
    sortField: 'votes.kp',
    sortType: -1
  }
}
