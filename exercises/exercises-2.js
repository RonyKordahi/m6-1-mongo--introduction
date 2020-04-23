const assert = require("assert");
const { MongoClient } = require('mongodb');

// exercise 2-1
const createGreeting = async (req, res) => {
    
    try {
        const client = new MongoClient("mongodb://localhost:27017", {
            useUnifiedTopology: true,
        });
        await client.connect();
        
        const db = client.db("exercise_two");
        const r = await db.collection('greetings').insertOne(req.body);
        assert.equal(1, r.insertedCount);
        client.close();
        res.status(201).json({ status: 201, data: req.body });

    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
        console.log(err.stack);
    }
};

// exercise 2-3
const getGreeting = async (req, res) => {
    const {_id} = req.params;

    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });
    await client.connect();
    
    const db = client.db("exercise_two");
    db.collection('greetings').findOne({ _id }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, _id, data: result })
            : res.status(404).json({ status: 404, _id, data: 'Not Found' });
        client.close();
    });

};

// exercise 2-4
const getGreetings = async(req, res) => {
    const {start, limit} = req.query;
    let startSlice = parseInt(start);
    let endSlice = parseInt(limit);

    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db("exercise_two");
    db.collection("greetings")
        .find()
        .toArray((err, data) => {
            if (err) {
                res.status(400).json({nope: "nope", error: err})
            }
            else {
                let newData;
                if (start || limit) {
                    if (!startSlice) startSlice = 0;
                    if (!endSlice) endSlice = 25;
                    if (startSlice > data.length) {
                        startSlice = data.length - 10;
                        endSlice = data.length;
                    }
                    newData = data.slice(startSlice, startSlice + endSlice);
                }
                else {
                    newData = data.slice(0, 25);
                }

                res.status(200).json({ status: 200, connection: 'successful!', start: startSlice, limit: endSlice, data: newData});
                client.close();
                console.log('disconnected!');
            }
        })
};

// exercise 2.5
const deleteGreeting = async () => {
    const {_id} = req.params;

    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db("exercise_two");

    db.collection('greetings').deleteOne({ _id }, (err, result) => {
        result
            ? res.status(204).json({ status: 204, message: "erased"  })
            : res.status(404).json({ status: 404, data: 'Not Found' });
        client.close();
    });

    client.close();
    console.log('disconnected!');
}

// exercise 2.6
const updateGreeting = async (req, res) => {
    const { _id } = req.params;

    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db("exercise_two");
    const r = await db.collection("greetings").findOne({_id});

    if(r.hello) {
        db.collection('greetings').updateOne({_id}, {$set: {...req.body}});
        res.status(200).json({ status: 200, _id, ...req.body });
    }
    else {
        res.status(404).json({status: 404, message: "key not found"})
    }
}

module.exports = {
    createGreeting,
    getGreeting,
    getGreetings,
    deleteGreeting,
    updateGreeting,
};