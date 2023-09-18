import express, {Express, Router, Request, Response} from "express";

import Cacher from "../../persistence/memory/Cacher";
import MoviesSearchEndpoint from "./endpoints/MoviesSearchEndpoint";
import MovieDetailEndpoint from "./endpoints/MovieDetailEndpoint";
import NotFoundEndpoint from "./endpoints/NotFoundEndpoint";

// RoutesHandler

/*
 * Handle the Routes for all of the Web Server Endpoint mapping
 */

class RoutesHandler {

    expressApp:Express;
    router:Router;

    constructor(expressApp:Express) {
        this.expressApp = expressApp;
        this.router = express.Router();

        this.setupRoutes();
    }

    setupRoutes() {
        this.expressApp.use(this.router);
        this.moviesEndpoints();
        this.notFoundEndpoint();
    }

    moviesEndpoints() {
        const cacher:Cacher = new Cacher();

        const moviesSearchPaths:string[] = ["/search", "/search/:title", "/search/:title/:page"];
        const moviesSearchEndpoint:MoviesSearchEndpoint = new MoviesSearchEndpoint(cacher);
        this.router.get(moviesSearchPaths, (req:Request, res:Response) => {
            moviesSearchEndpoint.run(req, res);
        });

        const moviesMovieIdPaths:string[] = ["/movies", "/movies/:movieId"];
        const movieDetailEndpoint:MovieDetailEndpoint = new MovieDetailEndpoint(cacher);
        this.router.get(moviesMovieIdPaths, (req:Request, res:Response) => {
            movieDetailEndpoint.run(req, res);
        });
    }

    notFoundEndpoint() {
        const notFoundEndpoint:NotFoundEndpoint = new NotFoundEndpoint();
        this.router.get("*", (req:Request, res:Response) => {
            notFoundEndpoint.run(req, res);
        });
    }

}

// Export

export default RoutesHandler;
