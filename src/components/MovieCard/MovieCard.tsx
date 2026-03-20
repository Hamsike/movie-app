import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  showFavoriteButton?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, showFavoriteButton = true }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = favorites.some(m => m.id === movie.id);

  const handleAddToFavorites = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmAdd = () => {
    dispatch(addToFavorites(movie));
  };

  const handleRemoveFromFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromFavorites(movie));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      handleRemoveFromFavorites(e);
    } else {
      handleAddToFavorites();
    }
  };

  return (
    <>
      <div className={styles.movieCard}>
        <Link to={`/movie/${movie.id}`}>
          <img 
            src={movie.poster?.previewUrl || '/placeholder.jpg'} 
            alt={movie.name}
            className={styles.moviePoster}
          />
        </Link>
        <div className={styles.movieInfo}>
          <Link to={`/movie/${movie.id}`} className={styles.movieTitle}>
            {movie.name}
          </Link>
          <div className={styles.movieYear}>{movie.year}</div>
          <div className={styles.movieRating}>
            <span className={styles.ratingKp}>KP: {movie.rating.kp?.toFixed(1)}</span>
            <span className={styles.ratingImdb}>IMDB: {movie.rating.imdb?.toFixed(1)}</span>
          </div>
          {showFavoriteButton && (
            <button 
              onClick={handleFavoriteClick}
              className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAdd}
        title="Добавление в избранное"
        message={`Вы действительно хотите добавить фильм "${movie.name}" в избранное?`}
        confirmText="Добавить"
        cancelText="Отмена"
      />
    </>
  );
};