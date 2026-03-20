import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearFavorites } from '../../slices/favoritesSlice';
import styles from './FavoritesPage.module.css';

export const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className={styles.favoritesPage}>
        <div className={styles.favoritesEmpty}>
          <h2>★ Избранное пусто</h2>
          <p>Добавляйте фильмы в избранное, и они появятся здесь</p>
          <Link to="/" className={styles.button}>Перейти к фильмам</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.favoritesHeader}>
        <h1>★ Избранное</h1>
        <button onClick={() => dispatch(clearFavorites())} className={styles.buttonOutline}>
          Очистить всё
        </button>
      </div>

      <div className={styles.moviesGrid}>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className={styles.favoritesStats}>
        Всего фильмов: {favorites.length}
      </div>
    </div>
  );
};