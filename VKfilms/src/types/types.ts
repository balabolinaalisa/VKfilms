export interface Movie {
    id: number;
    name: string;
    year: number;
    rating:{kp:number};
    poster?: {url?: string};
    genres: {name:string}[];
}