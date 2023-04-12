"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({path: "../.env"});
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addBuk = async (request, response) => {
    const { title, author, currentlyReading, genres, condition, type, notes } = request.body;
    const { email } = request.params;

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");

        const newBuk = {
            title: title,
            author: author,
            currentlyReading: currentlyReading,
            genres: genres,
            condition: condition,
            type: type,
            notes: notes,
        }

        const newBukResult = await db.collection("bukkeepers").findOneAndUpdate({email:email}, {$push:{buks:newBuk}});
        console.log(newBukResult);
        if (newBukResult.insertedCount === 0) {
            return response.status(502).json({
                status: 502,
                message: "Database failed to add new buk.",
                })
            } return response.status(201).json({
                status: 201,
                data: newBuk,
                message: "New buk created successfully.",
                })    
    } catch (error) {
        return response.status(500).json({
            error: error.message,
        });
    } finally {
        client.close();
    }
}


const deleteBuk = async (request, response) => {
    const { title } = request.body;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const result = await db.collection("bukkeepers").deleteOne({ title });
        return response.status(200).json({
            status: 200,
            data: result,
            message: "DELETED bukkeeper",
        });
    }
    catch (error) {
        return response.status(500).json({
            message: error.message,
        });
    }
    finally {
        client.close();
    }
}


module.exports = {
    addBuk,
    deleteBuk,
};