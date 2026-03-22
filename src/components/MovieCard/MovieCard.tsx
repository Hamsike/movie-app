import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { FALLBACK_IMAGE } from '../../consts';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
    showFavoriteButton?: boolean;
}


export const MovieCard: React.FC<MovieCardProps> = ({ movie, showFavoriteButton = true }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imgError, setImgError] = useState(false);
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites.items);
    const isFavorite = favorites.some(item => item.id === movie.id);

    const kpRating = movie.rating?.kp ?? 0;
    const imdbRating = movie.rating?.imdb ?? 0;
    const posterUrl = movie.poster?.previewUrl || movie.poster?.url;
    const imageSrc = !imgError && posterUrl ? posterUrl : FALLBACK_IMAGE;

    const handleImageError = () => {
        setImgError(true);
    };

    const handleToggleFavorite = () => {
        if (!isFavorite) {
            dispatch(addToFavorites(movie))
        }
        else {
            dispatch(removeFromFavorites(movie.id))
        }
    }

    return (
        <>
            <div className={styles.movieCard}>
                <Link to={`/movie/${movie.id}`}>
                    <img
                        src={imageSrc}
                        alt={movie.name}
                        className={styles.moviePoster}
                        onError={handleImageError}
                    />
                </Link>
                <div className={styles.movieInfo}>
                    <Link to={`/movie/${movie.id}`} className={styles.movieTitle}>
                        {movie.name || movie.alternativeName || 'Без названия'}
                    </Link>
                    <div className={styles.movieYear}>{movie.year || '—'}</div>
                    <div className={styles.movieRating}>
                        <span className={styles.ratingKp}>
                            KP: {kpRating > 0 ? kpRating.toFixed(1) : '—'}
                        </span>
                        <span className={styles.ratingImdb}>
                            IMDB: {imdbRating > 0 ? imdbRating.toFixed(1) : '—'}
                        </span>
                    </div>
                    {showFavoriteButton && (
                        <button
                            onClick={() => setShowConfirmModal(true)}
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
                onConfirm={() => handleToggleFavorite()}
                titleMovie={`${movie.name || movie.alternativeName}`}
                typeModal={isFavorite}
            />
        </>
    );
};