const path = require("path");

module.exports = {
  mode: "production",
  entry: "./bundle/MoviesApp.js",
  output: {
    filename: "MoviesApp.js",
    path: path.resolve(__dirname, "bundlepack"),
  },
  target: "node",
  externals: {
    "express": "require('express')"
  }
};
