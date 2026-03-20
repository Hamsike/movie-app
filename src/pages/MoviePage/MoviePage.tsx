import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/useMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import styles from './MoviePage.module.css';

export const MoviePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = parseInt(id || '0');

    const { data: movie, isLoading, isError, error } = useMovie(movieId);

    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites.items);
    const isFavorite = movie ? favorites.some(m => m.id === movie.id) : false;

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

    return (
        <div className={styles.moviePage}>
            <div className={styles.movieDetail}>
                <img
                    src={movie.poster?.url || '/placeholder.jpg'}
                    alt={movie.name}
                    className={styles.moviePoster}
                />

                <div className={styles.movieInfo}>
                    <div className={styles.movieHeader}>
                        <h1>{movie.name}</h1>
                        <button
                            onClick={() => isFavorite
                                ? dispatch(removeFromFavorites(movie.id))
                                : dispatch(addToFavorites(movie))
                            }
                            className={styles.favoriteButton}
                        >
                            {isFavorite ? '★' : '☆'}
                        </button>
                    </div>

                    {movie.alternativeName && (
                        <div className={styles.alternativeName}>{movie.alternativeName}</div>
                    )}

                    <div className={styles.movieMeta}>
                        <span className={styles.year}>{movie.year} год</span>
                        {movie.movieLength && (
                            <span className={styles.length}>{movie.movieLength} мин</span>
                        )}
                        {movie.ageRating && (
                            <span className={styles.ageRating}>{movie.ageRating}+</span>
                        )}
                    </div>

                    <div className={styles.movieRatings}>
                        <div className={styles.ratingItem}>
                            <span className={styles.ratingLabel}>Кинопоиск</span>
                            <span className={styles.ratingValue}>{movie.rating.kp?.toFixed(1)}</span>
                        </div>
                        <div className={styles.ratingItem}>
                            <span className={styles.ratingLabel}>IMDB</span>
                            <span className={styles.ratingValue}>{movie.rating.imdb?.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className={styles.movieDescription}>
                        <h3>Описание</h3>
                        <p>{movie.description || movie.shortDescription || 'Описание отсутствует'}</p>
                    </div>

                    <div className={styles.movieDetails}>
                        <div className={styles.detailItem}>
                            <strong>Жанры:</strong> {movie.genres.map((g: { name: string }) => g.name).join(', ')}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Страны:</strong> {movie.countries.map((c: { name: string }) => c.name).join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};