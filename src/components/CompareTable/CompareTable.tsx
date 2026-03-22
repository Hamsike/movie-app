import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { removeFromCompare, clearCompare } from '../../slices/compareSlice';
import { FALLBACK_IMAGE } from '../../consts';
import styles from './CompareTable.module.css';

export const CompareTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const compareList = useAppSelector(state => state.compare.items);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (movieId: number) => {
    setImgErrors(prev => ({ ...prev, [movieId]: true }));
  };

  const getPosterSrc = (movie: any) => {
    const posterUrl = movie.poster?.previewUrl || movie.poster?.url;
    if (imgErrors[movie.id] || !posterUrl) {
      return FALLBACK_IMAGE;
    }
    return posterUrl;
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 7) return styles.high;
    if (rating >= 5) return styles.medium;
    return styles.low;
  };

  const formatRating = (rating: number) => {
    return rating > 0 ? rating.toFixed(1) : '—';
  };

  if (compareList.length === 0) {
    return (
      <div className={styles.emptyPanel}>
        <div className={styles.emptyContent}>
          <span className={styles.emptyIcon}>🔄</span>
          <p>Добавьте фильмы для сравнения</p>
          <span className={styles.emptyHint}>Нажмите кнопку на карточке</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comparePanel}>
      <div className={styles.panelHeader}>
        <h3>Сравнение фильмов ({compareList.length}/2)</h3>
        <button 
          onClick={() => dispatch(clearCompare())}
          className={styles.clearButton}
          title="Очистить всё"
        >
          ✕ Очистить всё
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th className={styles.paramColumn}>Параметр</th>
              {compareList.map(movie => (
                <th key={movie.id} className={styles.movieColumn}>
                  <div className={styles.movieHeader}>
                    <span className={styles.movieTitle}>
                      {movie.name || movie.alternativeName || 'Без названия'}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCompare(movie.id))}
                      className={styles.removeButton}
                      title="Убрать из сравнения"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.paramCell}>Постер</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.posterCell}>
                  <img
                    src={getPosterSrc(movie)}
                    alt={movie.name}
                    className={styles.poster}
                    onError={() => handleImageError(movie.id)}
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Год выпуска</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.valueCell}>
                  {movie.year || '—'}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Рейтинг Кинопоиск</td>
              {compareList.map(movie => (
                <td key={movie.id} className={`${styles.valueCell} ${getRatingClass(movie.rating?.kp ?? 0)}`}>
                  {formatRating(movie.rating?.kp ?? 0)}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Рейтинг IMDB</td>
              {compareList.map(movie => (
                <td key={movie.id} className={`${styles.valueCell} ${getRatingClass(movie.rating?.imdb ?? 0)}`}>
                  {formatRating(movie.rating?.imdb ?? 0)}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Жанры</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.valueCell}>
                  {movie.genres && movie.genres.length > 0
                    ? movie.genres.map(g => g.name).join(', ')
                    : '—'}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Длительность</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.valueCell}>
                  {movie.movieLength ? `${movie.movieLength} мин` : '—'}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Возрастной рейтинг</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.valueCell}>
                  {movie.ageRating ? `${movie.ageRating}+` : '—'}
                </td>
              ))}
            </tr>

            <tr>
              <td className={styles.paramCell}>Страны</td>
              {compareList.map(movie => (
                <td key={movie.id} className={styles.valueCell}>
                  {movie.countries && movie.countries.length > 0
                    ? movie.countries.map(c => c.name).join(', ')
                    : '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.panelFooter}>
        <span className={styles.infoText}>
          {compareList.length === 1 
            ? '➕ Добавьте ещё один фильм для полноценного сравнения' 
            : '✅ Сравнение двух фильмов'}
        </span>
      </div>
    </div>
  );
};