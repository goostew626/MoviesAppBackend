import express, { Express, Request, Response, NextFunction } from "express";
import http, { Server } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";

import RoutesHandler from "./routes/RoutesHandler";

// WebServer

/*
 * Handle the primary Web Server implementation
 */

class WebServer {

    port:number = 0;
    expressApp!:Express;
    httpServer!:Server;

    constructor(port:number) {
        this.port = port;

        this.setupServer();
        this.setupMiddleware();
        this.setupRoutes();

        this.run();
    }

    setupServer() {
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
    }

    setupMiddleware() {
        // cross origin for external client usage
        this.expressApp.use(cors());
        this.expressApp.set("trust proxy", "127.0.0.1");

        // specify endpoint data limits
        this.expressApp.use(bodyParser.urlencoded({ extended: true, limit: "8mb", parameterLimit: 1000000 }));
        this.expressApp.use(bodyParser.json({ limit: "8mb" }));

        // limit the frequency of requests
        this.expressApp.use(rateLimit({ windowMs: 1000, limit: 2, headers: true, message: "Cannot Exceed 2 Requests Per Second" }));
    }

    setupRoutes() {
        const routesHandler:RoutesHandler = new RoutesHandler(this.expressApp);
    }

    run() {
        this.httpServer.listen(this.port, () => {});
    }

}

// Export

export default WebServer;
