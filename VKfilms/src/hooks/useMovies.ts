import { useState } from "react";
import type { Movie } from '../types/types';

export const useMovies = () =>{
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setloading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    const fetchMovies = async (page: number=1) =>{
        setloading(true);
        try{
        const response = await fetch(
            `https://api.kinopoisk.dev/v1.4/movie?notNullFields=name&rating.kp=5-10&page=${page}&limit=50`,
            {
            headers:{
             'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
                    }
            },
        );
        const data = await response.json();
        setMovies(prev => [...prev, ...data.docs]);
    }
        catch(err)
        {
            setError("Ошибка загрузки фильмов");
        }
        finally{
            setloading(false);
        }
    };
    return {movies, fetchMovies, loading, error}; 
};