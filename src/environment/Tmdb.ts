// Tmdb

/*
 * Handle all configurations for the Tmdb Online Tool
 */

class Tmdb {

    apiUrl:string;
    imageUrl:string;
    accessToken:string;

    constructor() {
        this.apiUrl = "https://api.themoviedb.org/3";
        this.imageUrl = "https://image.tmdb.org/t/p/original";
        this.accessToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzdhYWYyOGQ4YWNkMDAzOGI5ODUxNjY0MTFhMDEzNCIsInN1YiI6IjY1MDJmZDgxNmEyMjI3MDEzNzJlNjQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.736bdJdGkBk3TkLUyaw3GnqKlEiwNlE_DNx-lk5MDRM";
    }

}

// Export

export default Tmdb;
