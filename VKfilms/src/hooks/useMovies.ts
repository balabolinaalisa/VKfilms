import { useState, useRef,useCallback,useEffect } from "react";
import type { Movie } from '../types/types';

export const useMovies = (filters?:{
    genres?:string[];
    rating?:[number,number];
    years?:[number,number];
}) =>{
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortController = useRef<AbortController | null>(null);
    const prevFilters = useRef<string>('');

    const getFiltersKey = useCallback(() => {
        return JSON.stringify(filters);
    }, [filters]);

     const fetchMovies = useCallback (async (page: number=1) =>{
         if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {   
        const params=new URLSearchParams({
            page:page.toString(),
            limit:'20',
            notNullFields:'name',
            'rating.kp': filters?.rating ? `${filters.rating[0]}-${filters.rating[1]}` : '5-10',
            'year': filters?.years ? `${filters.years[0]}-${filters.years[1]}` : '1990-2023'
        });
        if (filters?.genres?.length){
            params.append('genres.name',filters.genres.join('|'));
        }
        console.log('Fetching movies with params:', params.toString());
        const response = await fetch(
            `https://api.kinopoisk.dev/v1.4/movie?${params}`,
            {
            headers:{
             'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
             'Accept':'application/json'
                    },
              signal: abortController.current.signal        
            }
        );
        if (!response.ok)
        {
            throw new Error(`HTTP ошибка, статус ${response.status}`); 
        }

        const data = await response.json();
        setHasMore(data.docs.length > 0 && data.page < data.pages);
        return data.docs || [];
    }
    catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      }
      return [];
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  }, [filters]);

   useEffect(() => {
    const currentFilters = getFiltersKey();
    if (prevFilters.current !== currentFilters) {
      console.log('Filters changed, resetting state:', currentFilters);
      setMovies([]);
      setPage(1);
      setHasMore(true);
      prevFilters.current = currentFilters;
      fetchMovies(1).then(newMovies => {
        setMovies(newMovies);
        setHasMore(newMovies.length > 0);
      });
    }
  }, [getFiltersKey]);

    useEffect(() => {
    const loadData = async () => {
      if (page === 1 && movies.length > 0) return;
      
      const newMovies = await fetchMovies(page);
      setMovies(prev => page === 1 ? newMovies : [...prev, ...newMovies]);
      setHasMore(newMovies.length > 0);
    };

    loadData();
  }, [page, fetchMovies]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setPage(prev => prev + 1);
  }, [hasMore, isLoading]);

  return {
    movies,
    loadMore,
    hasMore,
    isLoading,
    error
  };
};