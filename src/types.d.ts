export interface ITheme {
  title: string;
  icon: IconType;
}

export interface INavLink extends ITheme {
  path: string;
}

export interface IMovie {
  id: number;
  poster_path: string;
  original_title: string;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  videos?: { results: { id: string; key: string; name: string; type: string }[] };
  credits?: { cast: { id: number; profile_path: string; name: string; character?: string }[] };
}

