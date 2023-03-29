"use strict"

// import node_modules
const express = require("express");
const morgan = require("morgan");

// const {
    // call handler functions
// } = require("./handlers");

const app = express()
    app.use(morgan("tiny"))
    app.use(express.json())

    app.use(express.static("public"))

    // RESTful end points go here
    //     • POST- CREATES a new record in the database.
    //     • GET- REQUESTS reads information sourced from a database.
    //     • PUT/PATCH- UPDATES an obiect.
    //     • DELETE- DELETES/removes a record from the database.



        // GET POST PATCH DELETE
            // EXAMPLES
                // app.get("/api/get-reservations", getReservations)
                // app.get("/api/get-reservation/:reservation", getSingleReservation)
                // app.post("/api/add-reservation", addReservation)
                // app.patch("/api/update-reservation", updateReservation)
                // app.delete("/api/delete-reservation/:reservation", deleteReservation)



    // catch-all endpoint
    app.get("*", (request, response) => {
        response.status(404).json({
            status: 404,
            message: "Oops! Something went wrong...",
        })
    })

    app.listen(8000, () => console.log(`Listening on port 8000`));