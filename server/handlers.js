// EXAMPLES
// https://github.com/tessarenstephens/project-slingair/blob/master/backend/handlers.js


const { MongoClient } = require("mongodb");
require("dotenv").config({path: "../.env"});
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("BUKSHELF");
const bukkeepers = db.collection("bukkeepers");


// CREATE a bukkeeper
const addBukkeeper = async (request, response) => {
    const { fullName, email, buks } = request.body;
    try {
        await client.connect();

        const newBukkeeper = {
            fullName: fullName,
            email: email,
            buks: buks,
        }

        const newBukkeeperResult = await bukkeepers.insertOne(newBukkeeper);
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
    try {
        await client.connect();
        const result = await bukkeepers.find().toArray();
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


// GET a bukkeeper
const getBukkeeper = async (request, response) => {
    const { email } = request.params;
    try {
        await client.connect();
        const result = await bukkeepers.findOne({ email });
        return response.status(200).json({
            status: 200,
            data: result,
            message: "GET a single bukkeeper",
        });
    }
    catch (error) {
        return response.status(500).json({
            error: error.message,
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
    try {
        await client.connect();
        const result = await bukkeepers.updateOne({ email }, { $set: { fullName, bukkeeperName, buks  } });
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
    try {
        await client.connect();
        const result = await bukkeepers.deleteOne({ email });
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


// CHECK for existing bukkeeper @ LANDING PAGE
const verifyBukkeeper = async (request, response) => {
    const { email } = request.query;
    try {
        await client.connect();
        const bukkeeper = await bukkeepers.findOne({ email });
        if (bukkeeper) {
            return response.status(200).json({
                status: 200,
                inDB: true,
                bukkeeper: bukkeeper,
            })
        } else {
            return response.status(200).json({
                status: 200,
                inDB: false,
                bukkeeper: "verifyBukkeeper: User not registered",
            })
        }
    } catch (error) {
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