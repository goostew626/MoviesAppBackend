import { Response } from "express";

type ResponseContent = {
    status: number,
    results:any
};

// Responder

/*
 * Handle the HTTP Response with the Result Data being sent as a JSON String
 */

class Responder {

    send(res:Response, responseContent:ResponseContent) {
        this.setupHeaders(res);
        res.status(responseContent.status);
        res.end(JSON.stringify(responseContent.results));
    }

    setupHeaders(res:Response) {
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET");
        res.setHeader("Content-Type", "application/json");
    }

}

// Export

export default Responder;
export { ResponseContent };
