import forever from "forever-monitor";

/*
 * Utility function to handle running a simulated
 * production environment using forever and forever-monitor
 */

const uid = "MoviesAppBackground";

const service = new (forever.Monitor)("./bundle/MoviesApp.js", {
    uid: uid,
    command: "ts-node",
    max: 1,
    silent: false,
    killTree: true,
    args: []
});

console.log("Running MoviesApp in Background");

service.on("exit", () => {
    console.log("Exitting MoviesApp");
});

service.start();
