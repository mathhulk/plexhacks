require("dotenv").config( );

const express = require("express");
const app = express( );

const Congress = require("./src/Congress.js");
app.locals.congress = new Congress(process.env.X_API_KEY);

const routes = require("./routes");

// Limit requests to client
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next( );
});

app.use("/", routes);

app.listen(process.env.PORT, ( ) => {
    console.log("Listening on port " + process.env.PORT + "...");
});
