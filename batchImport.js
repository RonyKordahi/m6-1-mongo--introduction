const fs = require("file-system");
const { MongoClient } = require('mongodb');

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const  batchImport = async () => {
    try {
        const client = new MongoClient("mongodb://localhost:27017", {
            useUnifiedTopology: true,
        });

        await client.connect();
        const db = client.db("exercise_two");

        await db.collection("greetings");

        const r = await db.collection('greetings').insertMany(greetings);

        assert.equal(greetings.length, r.insertedCount); // looked at solutions
        console.log("success");
    } catch (err) {
        console.log("failure");
        console.log(err.stack);
    }
}

batchImport();