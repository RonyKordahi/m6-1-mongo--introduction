const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
    const {dbName, collection} = req.params;

    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    await client.connect();
    console.log('connected!');

    const db = client.db(dbName);

    db.collection(collection)
        .find()
        .toArray((err, data) => {
            if (err) {
                res.status(400).json({nope: "nope", error: err})
            }
            else {
                res.status(200).json({ status: 200, connection: 'successful!' });
                client.close();
                console.log('disconnected!');
            }
        })

};

module.exports = {
    getCollection,
};