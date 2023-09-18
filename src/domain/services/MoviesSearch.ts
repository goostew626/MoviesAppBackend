import Tmdb from "../../environment/Tmdb";
import ExternalApi from "../../util/ExternalApi";

// Types

type Input = {
    title:string,
    page:string
};

type Output = {
    message:string,
    results:{
        page:string,
        totalPages:string,
        totalResults:string,
        movies:Movie[]
    }
};

// MoviesSearch

/*
 * Service to handle the retrieval of all Movie Results
 * from an External API using a Movie's Title
 */

class MoviesSearch {

    input!:Input;
    output!:Output;
    tmdb:Tmdb;
    externalApi:ExternalApi;

    constructor() {
        this.initInput();
        this.initOutput();
        this.tmdb = new Tmdb();
        this.externalApi = new ExternalApi();
    }

    initInput() {
        this.input = {
            title: "",
            page: ""
        };
    }

    initOutput() {
        this.output = {
            message: "",
            results: {
                page: "",
                totalPages: "",
                totalResults: "",
                movies: []
            }
        };
    }

    setInput(title:string, page:string) {
        this.input.title = title || "";
        this.input.page = page || "1";
    }

    find():Promise<any> {
        const self = this;
        return new Promise((resolve:any, reject:any) => {
            self.initOutput();

            const inputErrors:string = this.getInputErrors();
            if(inputErrors) {
                this.output.message = inputErrors;
                reject(inputErrors);
            }

            self.externalApi.init()
                .setUrl(self.tmdb.apiUrl + "/search/movie")
                .setMethod("GET")
                .addHeader("Authorization", self.tmdb.accessToken)
                .addParam("query", self.input.title)
                .addParam("page", self.input.page);

            self.externalApi.send()
                .then((externalApiResolve:any) => {
                    this.parseOutput(externalApiResolve.data);
                    resolve("OK");
                })
                .catch((externalApiReject:any) => {
                    this.output.message = externalApiReject;
                    reject(externalApiReject);
                });
        });
    }

    getInputErrors():string {
        const errors:string[] = [];

        if(!this.input.title) { errors.push("Missing Title"); }

        return errors.join(", ");
    }

    parseOutput(data:any) {
        this.output.message = `Found ${data.total_results || "0"} Movie(s)`;
        this.output.results.page = data.page;
        this.output.results.totalPages = data.total_pages;
        this.output.results.totalResults = data.total_results;
        this.output.results.movies = this.parseMovies(data);
    }

    parseMovies(data:any):Movie[] {
        const movies:Movie[] = [];

        data.results.forEach((result:any) => {
            const movie:Movie = new Movie(
                result.id,
                result.title,
                result.poster_path,
                result.release_date
            );

            movies.push(movie);
        });

        return movies;
    }

    getOutput():Output {
        return this.output;
    }

}

// Movie

class Movie {

    id:string;
    title:string;
    posterUrl:string;
    releaseYear:string;

    constructor(id:string, title:string, posterPath:string, releaseDate:string) {
        this.id = id;
        this.title = title;
        this.posterUrl = this.getPosterUrl(posterPath);
        this.releaseYear = this.getReleaseYear(releaseDate);
    }

    getPosterUrl(posterPath:string):string {
        if(!posterPath) { return ""; }
        const tmdb:Tmdb = new Tmdb();
        const posterUrl:string = tmdb.imageUrl + posterPath;

        return posterUrl;
    }

    getReleaseYear(releaseDate:string):string {
        const date:Date = new Date(releaseDate);
        const year:number = date.getFullYear();
        if(isNaN(year)) { return ""; }
        const releaseYear:string = year.toString();

        return releaseYear;
    }

}

// Exports

export default MoviesSearch;
