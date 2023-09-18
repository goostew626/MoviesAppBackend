import { Request, Response } from "express";

import Cacher from "../../../persistence/memory/Cacher";
import Responder, { ResponseContent } from "./util/Responder";
import MoviesSearch from "../../../../domain/services/MoviesSearch";

// MoviesSearchEndpoint

/*
 * Provide Endpoint implementation for interacting with MoviesSearch Service
 */

class MoviesSearchEndpoint {

    cacher:Cacher;
    responder:Responder;
    moviesSearch:MoviesSearch;

    constructor(cacher:Cacher) {
        this.cacher = cacher;
        this.responder = new Responder();
        this.moviesSearch = new MoviesSearch();
    }

    run(req:Request, res:Response) {
        const responseContent:ResponseContent = {
            status: 0,
            results: ""
        };

        const cacheKey:string = `MoviesSearch_${req.params.title}_${req.params.page}`;
        if(this.cacher.contains(cacheKey)) {
            const cacheVal:any = this.cacher.get(cacheKey);
            this.handleResponse(res, cacheKey, cacheVal.status, cacheVal.results);
            return;
        }

        this.moviesSearch.setInput(req.params.title, req.params.page);
        this.moviesSearch.find()
            .then((resolve:any) => {
                this.handleResponse(res, cacheKey, 200, this.moviesSearch.getOutput());
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

export default MoviesSearchEndpoint;
