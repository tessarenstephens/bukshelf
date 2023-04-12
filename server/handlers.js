"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({path: "../.env"});
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// CREATE a bukkeeper
const addBukkeeper = async (request, response) => {
    const { fullName, userName, email, buks } = request.body;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const newBukkeeper = {
            fullName: fullName,
            userName: userName,
            email: email,
            buks: buks,
        }
        const newBukkeeperResult = await db.collection("bukkeepers").insertOne(newBukkeeper);
        if (newBukkeeperResult.insertedCount === 0) {
            return response.status(502).json({
                status: 502,
                message: "Database failed to add new bukkeeper.",
                })
            } return response.status(201).json({
                status: 201,
                data: newBukkeeper,
                message: "New bukkeeper created successfully.",
                })    
    } catch (error) {
        return response.status(500).json({
            error: error.message,
        });
    } finally {
        client.close();
    }
}

// GET all bukkeepers
const getBukkeepers = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const result = await db.collection("bukkeepers").find().toArray();
        return response.status(200).json({
            status: 200,
            data: result,
            message: "GET all bukkeepers",
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
};


// GET a bukkeeper - called in UserContext
const getBukkeeper = async (request, response) => {
    const { email } = request.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const result = await db.collection("bukkeepers").findOne({ email });
        console.log(result);
        if (result) {
            return response.status(200).json({
                status: 200,
                data: result,
                message: "GET a single bukkeeper",
            })
        } else {
            return response.status(404).json({
                status: 404,
                data: result,
                message: "bukkeeper not found, must register",
            })
        }
    } catch (error) {
        return response.status(500).json({
            error: error,
            message: "GET bukkeeper failed",
        });
    }
    finally {
        client.close();
    }
};


// UPDATE a bukkeeper
const updateBukkeeper = async (request, response) => {
    const { email } = request.body;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const result = await db.collection("bukkeepers").updateOne({ email }, { $set: { fullName, bukkeeperName, buks  } });
        return response.status(200).json({
            status: 200,
            data: result,
            message: "UPDATED bukkeeper",
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


// DELETE a bukkeeper
const deleteBukkeeper = async (request, response) => {
    const { email } = request.body;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const result = await db.collection("bukkeepers").deleteOne({ email });
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


// CHECK for existing bukkeeper - called in Landing
const verifyBukkeeper = async (request, response) => {
    const { email } = request.query;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("BUKSHELF");
        const bukkeeper = await db.collection("bukkeepers").findOne({ email });
        console.log(bukkeeper);
        if (bukkeeper) {
            return response.status(200).json({
                status: 200,
                inDB: true,
                bukkeeper: bukkeeper,
            })
        } else {
            return response.status(404).json({
                status: 404,
                inDB: false,
                bukkeeper: "verifyBukkeeper: User not registered",
            })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            alert: "verifyBukkeeper: Database failed.",
            data: error,
        });
    } finally {
        client.close();
    }
}



module.exports = {
    addBukkeeper,
    verifyBukkeeper,
    getBukkeepers,
    getBukkeeper,
    deleteBukkeeper,
    updateBukkeeper
};