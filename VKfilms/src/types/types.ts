export interface Movie {
  id: string;
  name: string;
  description?: string;
  year?: number;
  movieLength?: number;
  rating?: {
    kp?: number;
    imdb?: number;
  };
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  genres?: {
    name: string;
  }[];
  countries?: {
    name: string;
  }[];
  persons?: {
    id: string;
    name: string;
    profession: string;
  }[];
}