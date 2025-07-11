import {useEffect,useRef } from "react";
import type {Movie} from '../types/types';


export const useInfiniteScroll = (callback:()=> void)=>{
    const observerRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting)
                {
                    callback();
                }
             },
            {threshold:0.1}
            );
            if(observerRef.current){
                observer.observe(observerRef.current);
            }
            return()=> observer.disconnect();
        
    }, [callback]);
    return observerRef;
} ;