"use strict"

// import node_modules
const express = require("express");
const morgan = require("morgan");

// import handler functions
const {
    addBukkeeper,
    verifyBukkeeper,
    getBukkeepers,
    getBukkeeper,
    deleteBukkeeper,
    updateBukkeeper,
} = require("./handlers");

const {
    addBuk,
    deleteBuk,
} = require("./bukHandlers");


// express app
const app = express()
// middleware
    app.use(morgan("tiny"))
    app.use(express.json())

    app.use(express.static("public"))



// api BUKKEEPER endpoints
// -CREATE a bukkeeper
    app.post("/api/bukkeeper", addBukkeeper)
// -GET all bukkeepers
    app.get("/api/bukkeepers", getBukkeepers)
// -CHECK for existing bukkeeper
    app.get("/api/bukkeeper/verify", verifyBukkeeper)
// -GET a bukkeeper
    app.get("/api/bukkeeper/:email", getBukkeeper)
// -UPDATE a bukkeeper
    app.patch("/api/bukkeeper/:email", updateBukkeeper)
// -DELETE a bukkeeper
    app.delete("/api/bukkeeper/:email", deleteBukkeeper)

// api BUK endpoints
// -CREATE a buk
    app.patch("/api/bukkeeper/buk/:email", addBuk)
// -DELETE a buk
    app.delete("/api/bukkeeper/:email/:title", deleteBuk)

// catch-all endpoint
    app.get("*", (request, response) => {
        response.status(404).json({
            status: 404,
            message: "Oops! Something went wrong...",
        })
    })

    app.listen(8000, () => console.log(`Listening on port 8000`));