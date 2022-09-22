export interface Movie {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    tagline: string;
    genres: [{
        id: number,
        name: string
    }];
    production_companies: [
        {
            id: number,
            logo_path: string,
            name: string,
        }
    ]
}