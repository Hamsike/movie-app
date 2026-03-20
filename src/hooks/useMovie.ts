import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { movieService } from '../services/movieService';
import type { Filters } from '../types';

export const useMovies = (filters?: Filters) => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['movies', filters],
    queryFn: ({ pageParam = 1 }) => movieService.getMovies(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const prefetchNextPage = () => {
    const nextPage = data?.pages.length ? data.pages.length + 1 : 2;
    if (hasNextPage) {
      queryClient.prefetchInfiniteQuery({
        queryKey: ['movies', filters],
        queryFn: () => movieService.getMovies(nextPage, filters),
        initialPageParam: nextPage,
      });
    }
  };

  const allMovies = data?.pages.flatMap(page => page.docs) ?? [];
  const totalResults = data?.pages[0]?.total ?? 0;

  return {
    movies: allMovies,
    totalResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    prefetchNextPage,
  };
};

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getMovieById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: movieService.getGenres,
    staleTime: 30 * 60 * 1000,
  });
};
