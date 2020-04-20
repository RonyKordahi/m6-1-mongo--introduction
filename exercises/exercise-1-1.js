const { MongoClient } = require('mongodb');

const dbFunction = async (dbName) => {
    // create a new client
    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });

    // open the connection to the database server
    await client.connect();
    console.log("connected!");

    const db = client.db(dbName);
    await db.collection("one").insertOne({name: "Duck Rogers"});

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

dbFunction("exercise_one");