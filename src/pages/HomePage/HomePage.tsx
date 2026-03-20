import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../../hooks/useMovie';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { FiltersPanel } from '../../components/FiltersPanel/FiltersPanel';
import type { Filters } from '../../types';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Инициализация фильтров из URL при загрузке
  useEffect(() => {
    const urlFilters: Filters = {};
    
    const year = searchParams.get('year');
    const genre = searchParams.get('genre');
    const ratingFrom = searchParams.get('ratingFrom');
    const ratingTo = searchParams.get('ratingTo');
    
    if (year) urlFilters.year = year;
    if (genre) urlFilters.genre = genre;
    if (ratingFrom) urlFilters.ratingFrom = Number(ratingFrom);
    if (ratingTo) urlFilters.ratingTo = Number(ratingTo);
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
      setShowFilters(true); // Показываем фильтры если они активны
    }
  }, []);
  
  const {
    movies,
    totalResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    prefetchNextPage,
  } = useMovies(filters);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        prefetchNextPage();
        fetchNextPage();
      }
    }, { threshold: 0.1, rootMargin: '100px' });

    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, prefetchNextPage]);

  const clearFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return (
      <div className={styles.homePage}>
        <div className={styles.homeHeader}>
          <h1 className={styles.title}>🎬 MovieApp</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка фильмов...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.homePage}>
        <div className={styles.homeHeader}>
          <h1 className={styles.title}>🎬 MovieApp</h1>
        </div>
        <div className={styles.errorMessage}>
          <p>Ошибка: {error?.message || 'Неизвестная ошибка'}</p>
          <button onClick={() => refetch()} className={styles.retryButton}>
            Повторить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.homeHeader}>
        <h1 className={styles.title}>🎬 MovieApp</h1>
        <button 
          className={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '▼ Скрыть фильтры' : '▶ Показать фильтры'}
        </button>
      </div>
      
      {showFilters && (
        <FiltersPanel 
          filters={filters} 
          onFilterChange={setFilters} 
          onClear={clearFilters}
        />
      )}

      {totalResults > 0 && (
        <div className={styles.resultsInfo}>
          Найдено фильмов: {totalResults}
          {Object.keys(filters).length > 0 && ' (с учетом фильтров)'}
        </div>
      )}

      {movies.length > 0 ? (
        <>
          <div className={styles.moviesGrid}>
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                className={styles.movieCardWrapper}
                ref={index === movies.length - 1 ? lastMovieRef : null}
                onMouseEnter={() => {
                  if (index === movies.length - 1 && hasNextPage) {
                    prefetchNextPage();
                  }
                }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {isFetchingNextPage && (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
              <p>Загрузка дополнительных фильмов...</p>
            </div>
          )}
          
          {!hasNextPage && movies.length > 0 && (
            <div className={styles.endMessage}>
              <p>🎬 Вы просмотрели все доступные фильмы</p>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          <h2>Фильмы не найдены</h2>
          <p>Попробуйте изменить параметры фильтрации</p>
          <button onClick={clearFilters} className={styles.button}>
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};