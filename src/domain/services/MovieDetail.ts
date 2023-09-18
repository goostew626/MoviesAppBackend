import Tmdb from "../../environment/Tmdb";
import ExternalApi from "../../util/ExternalApi";

type Input = {
    movieId:string
}

type Output = {
    message:string,
    results:{
        movie:Movie | undefined
    }
}

// MovieDetail

/*
 * Service to handle the retrieval of a Movie's Details
 * from an External API using the Movie's ID
 */

class MovieDetail {

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
            movieId: ""
        };
    }

    initOutput() {
        this.output = {
            message: "",
            results: {
                movie: undefined
            }
        };
    }

    setInput(movieId:string) {
        this.input.movieId = movieId || "";
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
                .setUrl(self.tmdb.apiUrl + "/movie/" + self.input.movieId)
                .setMethod("GET")
                .addHeader("Authorization", self.tmdb.accessToken);

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

        if(!this.input.movieId) { errors.push("Missing ID"); }

        return errors.join(", ");
    }

    parseOutput(data:any) {
        this.output.message = `Found Movie`;
        this.output.results.movie = new Movie(
            data.id,
            data.title,
            data.tagline,
            data.poster_path,
            data.release_date,
            data.popularity,
            data.overview
        );
    }

    getOutput():Output {
        return this.output;
    }

}

// Movie

class Movie {

    id:string;
    title:string;
    tagline:string;
    posterUrl:string;
    releaseDate:string;
    popularity:string;
    overview:string;

    constructor(id:string, title:string, tagline:string, posterPath:string, releaseDate:string, popularity:string, overview:string) {
        this.id = id;
        this.title = title;
        this.tagline = tagline;
        this.posterUrl = this.getPosterUrl(posterPath);
        this.releaseDate = releaseDate;
        this.popularity = popularity;
        this.overview = overview;
    }

    getPosterUrl(posterPath:string):string {
        if(!posterPath) { return ""; }
        const tmdb:Tmdb = new Tmdb();
        const posterUrl:string = tmdb.imageUrl + posterPath;

        return posterUrl;
    }

}

// Export

export default MovieDetail;
