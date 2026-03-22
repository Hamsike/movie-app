import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { FALLBACK_IMAGE } from '../../consts';
import styles from './MovieCard.module.css';
import { addToCompare } from '../../slices/compareSlice';

interface MovieCardProps {
    movie: Movie;
    showFavoriteButton?: boolean;
    showCompareButton?: boolean
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
    movie, 
    showFavoriteButton = true, 
    showCompareButton = true 
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imgError, setImgError] = useState(false);
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites.items);
    const compareList = useAppSelector(state => state.compare.items);

    const isFavorite = favorites.some(item => item.id === movie.id);
    const isInCompare = compareList.some(m => m.id === movie.id);

    const kpRating = movie.rating?.kp ?? 0;
    const imdbRating = movie.rating?.imdb ?? 0;
    const posterUrl = movie?.poster?.url || movie?.poster?.previewUrl;
    const imageSrc = !imgError && posterUrl ? posterUrl : FALLBACK_IMAGE;

    const handleImageError = () => {
        setImgError(true);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isFavorite) {
            setShowConfirmModal(true);
        } else {
            dispatch(removeFromFavorites(movie.id));
        }
    };

    const handleConfirmAdd = () => {
        dispatch(addToFavorites(movie));
        setShowConfirmModal(false);
    };

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCompare(movie));
    };

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
                    <div className={styles.buttonGroup}>
                        {showFavoriteButton && (
                            <button
                                onClick={handleToggleFavorite}
                                className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                                title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                            >
                                {isFavorite ? '★' : '☆'}
                            </button>
                        )}
                        {showCompareButton && (
                            <button
                                onClick={handleCompareClick}
                                className={`${styles.compareButton} ${isInCompare ? styles.active : ''}`}
                                title={isInCompare ? 'Убрать из сравнения' : 'Сравнить'}
                            >
                                {isInCompare ? '✓' : '🔄'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmAdd}
                titleMovie={`${movie.name || movie.alternativeName}`}
                typeModal={false}
            />
        </>
    );
};