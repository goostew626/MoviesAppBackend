import WebServer from "./infrastructure/webServer/WebServer";

// MovieApp

/*
 * The primary entry point for the application
 */

class MoviesApp {

    constructor() {
        console.log("Running MoviesApp");

        this.startWebServer();
    }

    startWebServer() {
        const webServer:WebServer = new WebServer(30);
    }

}

// Run Application

const moviesApp:MoviesApp = new MoviesApp();
