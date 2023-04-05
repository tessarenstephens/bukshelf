"use strict"

// import node_modules
const express = require("express");
const morgan = require("morgan");

const {
    addBukkeeper,
    verifyBukkeeper,
    getBukkeeper,
    deleteBukkeeper,
    updateBukkeeper,
} = require("./handlers");

const app = express()
    app.use(morgan("tiny"))
    app.use(express.json())

    app.use(express.static("public"))
    
    // endpoints for creating, finding, updating and deleting bukkeepers
    app.post("/add-bukkeeper", addBukkeeper)
    app.get("/bukkeeper/:userName", getBukkeeper)
    app.get("/bukkeeper/verify", verifyBukkeeper)
    app.patch("/update-bukkeeper", updateBukkeeper)
    app.delete("/delete-bukkeeper", deleteBukkeeper)


    // catch-all endpoint
    app.get("*", (request, response) => {
        response.status(404).json({
            status: 404,
            message: "Oops! Something went wrong...",
        })
    })

    app.listen(8000, () => console.log(`Listening on port 8000`));