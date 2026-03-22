import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/useMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { addToCompare } from '../../slices/compareSlice';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { FALLBACK_IMAGE } from '../../consts';
import styles from './MoviePage.module.css';

export const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const { data: movie, isLoading, isError, error } = useMovie(movieId);
  
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const compareList = useAppSelector(state => state.compare.items);
  
  const isFavorite = movie ? favorites.some(m => m.id === movie.id) : false;
  const isInCompare = movie ? compareList.some(m => m.id === movie.id) : false;

  if (isLoading) {
    return (
      <div className={styles.moviePage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className={styles.moviePage}>
        <div className={styles.errorMessage}>
          {error?.message || 'Фильм не найден'}
        </div>
      </div>
    );
  }

  const kpRating = movie.rating?.kp ?? 0;
  const imdbRating = movie.rating?.imdb ?? 0;
  const posterUrl = movie.poster?.url || movie.poster?.previewUrl;
  const posterSrc = !imgError && posterUrl ? posterUrl : FALLBACK_IMAGE;

  const handleImageError = () => {
    setImgError(true);
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(movie));
    setShowConfirmModal(false);
  };

  const handleToggleFavorite = () => {
    if (!isFavorite) {
      setShowConfirmModal(true);
    } else {
      dispatch(removeFromFavorites(movie.id));
    }
  };

  const handleCompareClick = () => {
    dispatch(addToCompare(movie));
  };

  return (
    <>
      <div className={styles.moviePage}>
        <div className={styles.movieDetail}>
          <img 
            src={posterSrc}
            alt={movie.name || movie.alternativeName || 'Без названия'}
            className={styles.moviePoster}
            onError={handleImageError}
          />
          
          <div className={styles.movieInfo}>
            <div className={styles.movieHeader}>
              <h1>{movie.name || movie.alternativeName || 'Без названия'}</h1>
              <div className={styles.actionButtons}>
                <button 
                  onClick={handleToggleFavorite}
                  className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                  title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
                <button 
                  onClick={handleCompareClick}
                  className={`${styles.compareButton} ${isInCompare ? styles.active : ''}`}
                  title={isInCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
                >
                  {isInCompare ? '✓' : '🔄'}
                </button>
              </div>
            </div>
            
            {movie.alternativeName && movie.alternativeName !== movie.name && (
              <div className={styles.alternativeName}>{movie.alternativeName}</div>
            )}
            
            <div className={styles.movieMeta}>
              <span className={styles.year}>{movie.year || '—'} год</span>
              {movie.movieLength && movie.movieLength > 0 && (
                <span className={styles.length}>{movie.movieLength} мин</span>
              )}
              {movie.ageRating && (
                <span className={styles.ageRating}>{movie.ageRating}+</span>
              )}
            </div>

            <div className={styles.movieRatings}>
              <div className={styles.ratingItem}>
                <span className={styles.ratingLabel}>Кинопоиск</span>
                <span className={styles.ratingValue}>
                  {kpRating > 0 ? kpRating.toFixed(1) : '—'}
                </span>
              </div>
              <div className={styles.ratingItem}>
                <span className={styles.ratingLabel}>IMDB</span>
                <span className={styles.ratingValue}>
                  {imdbRating > 0 ? imdbRating.toFixed(1) : '—'}
                </span>
              </div>
            </div>

            <div className={styles.movieDescription}>
              <h3>Описание</h3>
              <p>{movie.description || movie.shortDescription || 'Описание отсутствует'}</p>
            </div>

            <div className={styles.movieDetails}>
              {movie.genres && movie.genres.length > 0 && (
                <div className={styles.detailItem}>
                  <strong>Жанры:</strong> {movie.genres.map((genre: { name: string }) => genre.name).join(', ')}
                </div>
              )}
              {movie.countries && movie.countries.length > 0 && (
                <div className={styles.detailItem}>
                  <strong>Страны:</strong> {movie.countries.map((country: { name: string }) => country.name).join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleAddToFavorites}
        titleMovie={movie.name || movie.alternativeName || 'фильм'}
        typeModal={false}
      />
    </>
  );
};