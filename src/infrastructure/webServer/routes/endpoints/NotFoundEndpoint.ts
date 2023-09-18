import { Request, Response } from "express";

import Responder, { ResponseContent } from "./util/Responder";

// NotFoundEndpoint

/*
 * Provide Endpoint as fallback response to all non existing Routes
 */

class NotFoundEndpoint {

    responder:Responder;

    constructor() {
        this.responder = new Responder();
    }

    run(req:Request, res:Response) {
        const responseContent:ResponseContent = {
            status: 0,
            results: ""
        };

        responseContent.status = 404;
        responseContent.results = { error: `Could Find Requested URL : ${req.originalUrl}` };
        this.responder.send(res, responseContent);
    }

}

// Export

export default NotFoundEndpoint;
