// EXAMPLES
// https://github.com/tessarenstephens/project-slingair/blob/master/backend/handlers.js


const { MongoClient } = require("mongodb");
require("dotenv").config({path: "../.env"});
const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("BUKSHELF");
const bukkeepers = db.collection("bukkeepers");


// NEW USER HANDLER

const verifyBukkeeper = async (request, response) => {
    const { email } = request.query;
    try {
        await client.connect();
        const user = await bukkeepers.findOne({ email });
        console.log(user);
        if (user) {
            return response.status(200).json({
                status: 200,
                inDB: false,
            })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Database failed.",
        });
    } finally {
        client.close();
    }
}



// DATABASE HANDLER FUNCTIONS GO HERE 

const addBukkeeper = async (request, response) => {
    const { preferredName, userName, email, location, bio, buks } = request.body;
    try {
        await client.connect();

        const newBukkeeper = {
            preferredName: preferredName,
            userName: userName,
            email: email,
            location: location,
            bio: bio,
            buks: buks,
        }
        const newBukkeeperResponse = await bukkeepers.insertOne(newBukkeeper);
        if (newBukkeeperResponse.insertedCount === 0) {
            return response.status(502).json({
                status: 502,
                message: "Database failed.",
            })
        } return response.status(201).json({
            status: 201,
            bukkeeper: newBukkeeper,
            message: "Bukkeeper added successfully.",
        })    
    } catch (error) {
        response.status(500).json(error);
    } finally {
        client.close();
    }
}

const getBukkeeper = async (request, response) => {
    const { userName } = request.body;
    try {
        await client.connect();
        const result = await bukkeepers.find({ userName }).toArray();
        response.status(200).json(result);
    }
    catch (error) {
        response.status(500).json(error);
    }
    finally {
        client.close();
    }
}

const deleteBukkeeper = async (request, response) => {
    const { userName } = request.body;
    try {
        await client.connect();
        const result = await bukkeepers.deleteOne({ userName });
        response.status(200).json(result);
    }
    catch (error) {
        response.status(500).json(error);
    }
    finally {
        client.close();
    }
}

const updateBukkeeper = async (request, response) => {
    const { userName } = request.body;
    try {
        await client.connect();
        const result = await bukkeepers.updateOne({ userName }, { $set: { email, firstName, lastName, password } });
        response.status(200).json(result);
    }
    catch (error) {
        response.status(500).json(error);
    }
    finally {
        client.close();
    }
}





    module.exports = {
        addBukkeeper,
        verifyBukkeeper,
        getBukkeeper,
        deleteBukkeeper,
        updateBukkeeper
    };