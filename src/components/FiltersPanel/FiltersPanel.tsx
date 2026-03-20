import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGenres } from '../../hooks/useMovie';
import type { Filters } from '../../types';
import styles from './FiltersPanel.module.css';

interface FiltersPanelProps {
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
    onClear: () => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
    filters,
    onFilterChange,
    onClear
}) => {
    const { data: genres = [] } = useGenres();
    const [searchParams, setSearchParams] = useSearchParams();

    const [localYear, setLocalYear] = useState(filters.year || searchParams.get('year') || '');
    const [localGenre, setLocalGenre] = useState(filters.genre || searchParams.get('genre') || '');
    const [localRatingFrom, setLocalRatingFrom] = useState(
        filters.ratingFrom?.toString() || searchParams.get('ratingFrom') || ''
    );
    const [localRatingTo, setLocalRatingTo] = useState(
        filters.ratingTo?.toString() || searchParams.get('ratingTo') || ''
    );

    useEffect(() => {
        const newParams = new URLSearchParams();

        if (localYear) newParams.set('year', localYear);
        if (localGenre) newParams.set('genre', localGenre);
        if (localRatingFrom) newParams.set('ratingFrom', localRatingFrom);
        if (localRatingTo) newParams.set('ratingTo', localRatingTo);

        setSearchParams(newParams, { replace: true });
    }, [localYear, localGenre, localRatingFrom, localRatingTo, setSearchParams]);

    const applyFilters = () => {
        const newFilters: Filters = {};

        if (localYear) newFilters.year = localYear;
        if (localGenre) newFilters.genre = localGenre;
        if (localRatingFrom) newFilters.ratingFrom = Number(localRatingFrom);
        if (localRatingTo) newFilters.ratingTo = Number(localRatingTo);

        onFilterChange(newFilters);
    };

    const handleClear = () => {
        setLocalYear('');
        setLocalGenre('');
        setLocalRatingFrom('');
        setLocalRatingTo('');
        onClear();
    };

    const handleRemoveYear = () => {
        setLocalYear('');
        const newFilters: Filters = {};
        if (localGenre) newFilters.genre = localGenre;
        if (localRatingFrom) newFilters.ratingFrom = Number(localRatingFrom);
        if (localRatingTo) newFilters.ratingTo = Number(localRatingTo);
        onFilterChange(newFilters);
    };

    const handleRemoveGenre = () => {
        setLocalGenre('');
        const newFilters: Filters = {};
        if (localYear) newFilters.year = localYear;
        if (localRatingFrom) newFilters.ratingFrom = Number(localRatingFrom);
        if (localRatingTo) newFilters.ratingTo = Number(localRatingTo);
        onFilterChange(newFilters);
    };

    const handleRemoveRatingFrom = () => {
        setLocalRatingFrom('');
        const newFilters: Filters = {};
        if (localYear) newFilters.year = localYear;
        if (localGenre) newFilters.genre = localGenre;
        if (localRatingTo) newFilters.ratingTo = Number(localRatingTo);
        onFilterChange(newFilters);
    };

    const handleRemoveRatingTo = () => {
        setLocalRatingTo('');
        const newFilters: Filters = {};
        if (localYear) newFilters.year = localYear;
        if (localGenre) newFilters.genre = localGenre;
        if (localRatingFrom) newFilters.ratingFrom = Number(localRatingFrom);
        onFilterChange(newFilters);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

    return (
        <div className={styles.filtersPanel}>
            <h3 className={styles.title}>Фильтры</h3>

            <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                    <label className={styles.label}>Год:</label>
                    <select
                        value={localYear}
                        onChange={(e) => setLocalYear(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Все года</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.label}>Жанр:</label>
                    <select
                        value={localGenre}
                        onChange={(e) => setLocalGenre(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Все жанры</option>
                        {genres.map((g: string) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.label}>Рейтинг от:</label>
                    <input
                        type="number"
                        value={localRatingFrom}
                        onChange={(e) => setLocalRatingFrom(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="10"
                        step="0.1"
                        className={styles.input}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.label}>Рейтинг до:</label>
                    <input
                        type="number"
                        value={localRatingTo}
                        onChange={(e) => setLocalRatingTo(e.target.value)}
                        placeholder="10"
                        min="0"
                        max="10"
                        step="0.1"
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={applyFilters} className={styles.button}>
                    Применить фильтры
                </button>
                <button onClick={handleClear} className={styles.buttonOutline}>
                    Сбросить все
                </button>
            </div>

            {(localYear || localGenre || localRatingFrom || localRatingTo) && (
                <div className={styles.activeFilters}>
                    <span className={styles.activeTitle}>Активные фильтры:</span>
                    <div className={styles.filterTags}>
                        {localYear && (
                            <span className={styles.filterTag}>
                                Год: {localYear}
                                <button onClick={handleRemoveYear} className={styles.removeTag}>✕</button>
                            </span>
                        )}
                        {localGenre && (
                            <span className={styles.filterTag}>
                                Жанр: {localGenre}
                                <button onClick={handleRemoveGenre} className={styles.removeTag}>✕</button>
                            </span>
                        )}
                        {localRatingFrom && (
                            <span className={styles.filterTag}>
                                От: {localRatingFrom}
                                <button onClick={handleRemoveRatingFrom} className={styles.removeTag}>✕</button>
                            </span>
                        )}
                        {localRatingTo && (
                            <span className={styles.filterTag}>
                                До: {localRatingTo}
                                <button onClick={handleRemoveRatingTo} className={styles.removeTag}>✕</button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};