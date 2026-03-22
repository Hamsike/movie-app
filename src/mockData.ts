import type { Movie, MoviesResponse } from './types';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const mockMovies: Movie[] = [
  {
    id: 1,
    name: "Дюна: Часть вторая",
    alternativeName: "Dune: Part Two",
    year: 2024,
    rating: { kp: 8.2, imdb: 8.7 },
    poster: { 
      url: `${IMAGE_BASE}/8b8R8l88Qje9dnbOE6h5ghZ7gJq.jpg`,
      previewUrl: `${IMAGE_BASE}/8b8R8l88Qje9dnbOE6h5ghZ7gJq.jpg`
    },
    genres: [{ name: "фантастика" }, { name: "драма" }, { name: "приключения" }],
    countries: [{ name: "США" }, { name: "Канада" }],
    movieLength: 166,
    ageRating: 12,
    description: "Пол Атрейдес объединяется с фрименам, чтобы отомстить заговорщикам, уничтожившим его семью. Ему предстоит выбрать между любовью всей своей жизни и судьбой известной вселенной.",
    shortDescription: "Продолжение эпической саги о пустынной планете Арракис."
  },
  {
    id: 2,
    name: "Мастер и Маргарита",
    alternativeName: "The Master and Margarita",
    year: 2024,
    rating: { kp: 7.8, imdb: 7.5 },
    poster: { 
      url: `${IMAGE_BASE}/aQvJ5VPz4NTBLUwqFlCwjBkf8Vj.jpg`,
      previewUrl: `${IMAGE_BASE}/aQvJ5VPz4NTBLUwqFlCwjBkf8Vj.jpg`
    },
    genres: [{ name: "драма" }, { name: "фэнтези" }, { name: "мистика" }],
    countries: [{ name: "Россия" }],
    movieLength: 157,
    ageRating: 18,
    description: "В Москве 1930-х годов появляется загадочный маг Воланд со своей свитой. Его появление переворачивает жизнь литератора Михаила Булгакова и его музы Маргариты.",
    shortDescription: "Экранизация культового романа Михаила Булгакова."
  },
  {
    id: 3,
    name: "Оппенгеймер",
    alternativeName: "Oppenheimer",
    year: 2023,
    rating: { kp: 8.1, imdb: 8.5 },
    poster: { 
      url: `${IMAGE_BASE}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
      previewUrl: `${IMAGE_BASE}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`
    },
    genres: [{ name: "биография" }, { name: "драма" }, { name: "история" }],
    countries: [{ name: "США" }, { name: "Великобритания" }],
    movieLength: 180,
    ageRating: 18,
    description: "История американского физика Роберта Оппенгеймера, который руководил Манхэттенским проектом по созданию атомной бомбы.",
    shortDescription: "Фильм о создателе атомной бомбы."
  },
  {
    id: 4,
    name: "Барби",
    alternativeName: "Barbie",
    year: 2023,
    rating: { kp: 7.2, imdb: 7.0 },
    poster: { 
      url: `${IMAGE_BASE}/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg`,
      previewUrl: `${IMAGE_BASE}/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg`
    },
    genres: [{ name: "комедия" }, { name: "приключения" }, { name: "фэнтези" }],
    countries: [{ name: "США" }, { name: "Великобритания" }],
    movieLength: 114,
    ageRating: 12,
    description: "Живущая в Барбиленде стереотипная Барби вместе с Кеном отправляется в реальный мир, чтобы найти настоящее счастье.",
    shortDescription: "Барби отправляется в приключение в реальном мире."
  },
  {
    id: 5,
    name: "Субстанция",
    alternativeName: "The Substance",
    year: 2024,
    rating: { kp: 7.5, imdb: 7.8 },
    poster: { 
      url: `${IMAGE_BASE}/lqoMz6ZYzK6NnNcD5CqJ4zG3h8X.jpg`,
      previewUrl: `${IMAGE_BASE}/lqoMz6ZYzK6NnNcD5CqJ4zG3h8X.jpg`
    },
    genres: [{ name: "ужасы" }, { name: "фантастика" }, { name: "драма" }],
    countries: [{ name: "США" }, { name: "Франция" }],
    movieLength: 141,
    ageRating: 18,
    description: "Звезда аэробики использует загадочное вещество, которое создает более молодую и совершенную версию её самой.",
    shortDescription: "Хоррор о молодости и красоте."
  },
  {
    id: 6,
    name: "Головоломка 2",
    alternativeName: "Inside Out 2",
    year: 2024,
    rating: { kp: 7.9, imdb: 8.2 },
    poster: { 
      url: `${IMAGE_BASE}/vWJnBzLC4nPYljz3v4FIVz2M3Yy.jpg`,
      previewUrl: `${IMAGE_BASE}/vWJnBzLC4nPYljz3v4FIVz2M3Yy.jpg`
    },
    genres: [{ name: "мультфильм" }, { name: "комедия" }, { name: "приключения" }],
    countries: [{ name: "США" }],
    movieLength: 96,
    ageRating: 6,
    description: "Райли уже подросток, и её эмоции сталкиваются с новыми чувствами — Тревогой, Завистью, Скукой и Стыдом.",
    shortDescription: "Новые эмоции в голове у Райли."
  }
];

export const getMockMoviesPage = (page: number): MoviesResponse => {
  
  return {
    docs: mockMovies,
    total: mockMovies.length,
    limit: 50,
    page: page,
    pages: Math.ceil(mockMovies.length / 50)
  };
};

export const mockMoviesResponse: MoviesResponse = {
  docs: mockMovies,
  total: mockMovies.length,
  limit: 50,
  page: 1,
  pages: 1
};