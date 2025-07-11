import { useState } from "react";
import type { Movie } from '../types/types';

export const useMovies = () =>{
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = async (page: number=1) =>{
        const response = await fetch(
            `https://api.kinopoisk.dev/v1.4/movie?notNullFields=name&rating.kp=5-10&page=${page}&limit=50`,
            {
            headers:{
             'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
                    }
            },
        );
        const data = await response.json();
        return data.docs || [];
    };
    const loadMore=async()=>{
        if(!hasMore){
            return;
        }
        const newMovies= await fetchMovies(page+1);    
        if(newMovies.length===0){
            setHasMore(false);
        }
        else{
            setMovies(prev=>[...prev,...newMovies]);
            setPage(prev=>prev+1);
        }
        };
    return{movies,loadMore,hasMore};
};
