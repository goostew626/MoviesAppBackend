import { Request, Response } from "express";

import Cacher from "../../../persistence/memory/Cacher";
import Responder, { ResponseContent } from "./util/Responder";
import MovieDetail from "../../../../domain/services/MovieDetail";

// MovieDetailEndpoint

/*
 * Provide Endpoint implementation for interacting with MovieDetail Service
 */

class MovieDetailEndpoint {

    cacher:Cacher;
    responder:Responder;
    movieDetail:MovieDetail;

    constructor(cacher:Cacher) {
        this.cacher = cacher;
        this.responder = new Responder();
        this.movieDetail = new MovieDetail();
    }

    run(req:Request, res:Response) {
        const responseContent:ResponseContent = {
            status: 0,
            results: ""
        };

        const cacheKey = `MovieDetail_${req.params.movieId}`;
        if(this.cacher.contains(cacheKey)) {
            const cacheVal:any = this.cacher.get(cacheKey);
            this.handleResponse(res, cacheKey, cacheVal.status, cacheVal.results);
            return;
        }

        this.movieDetail.setInput(req.params.movieId);
        this.movieDetail.find()
            .then((resolve:any) => {
                this.handleResponse(res, cacheKey, 200, this.movieDetail.getOutput());
            })
            .catch((reject:any) => {
                this.handleResponse(res, cacheKey, 400, { error: reject });
            });
    }

    handleResponse(res:Response, cacheKey:string, status:number, results:any) {
        const responseContent:ResponseContent = {
            status: status,
            results: results
        };

        this.cacher.insert(cacheKey, responseContent);
        this.responder.send(res, responseContent);
    }

}

// Export

export default MovieDetailEndpoint;
