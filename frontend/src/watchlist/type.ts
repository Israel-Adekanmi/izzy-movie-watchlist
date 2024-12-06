interface MovieCardProps {
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  id: number;
}

interface MovieDetailsCardProps {
    id: number;
  title: string; // Movie title
  release_date: string; // Release date
  popularity: number; // Popularity score
  poster_path: string; // Poster path
  overview: string; // Overview of the movie
  genres: Array<{ id: number; name: string }>; // List of genres
  runtime: number; // Runtime in minutes
  budget: number; // Budget of the movie
  revenue: number; // Revenue of the movie
  tagline: string; // Tagline of the movie
  homepage: string; // Official homepage URL
}

export interface Reminder {
    _id: string; // Assuming _id is a string
    userId: string;
    movieId: number;
    movieTitle: string;
    email: string;
    reminderTime: Date;
    isSent: boolean;
  }

interface SearchBarProps {
  onSearch: (query: string) => void;
  buttonText: string;
  placeholder: string;
}

export interface MovieItem {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
  }

  export interface MovieListItemProps {
    poster_path: string;
    title: string;
    release_date: string;
    onRemove: () => void;
  }
  
  
export type { MovieCardProps, SearchBarProps, MovieDetailsCardProps };
