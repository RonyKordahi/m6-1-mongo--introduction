'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {getCollection} = require("./exercises/exercise-1-2");
const {createGreeting,
        getGreeting, 
        getGreetings, 
        deleteGreeting,
        updateGreeting,} = require("./exercises/exercises-2");

const PORT = process.env.PORT || 8000;

express()
        .use(morgan('tiny'))
        .use(express.static('public'))
        .use(bodyParser.json())
        .use(express.urlencoded({ extended: false }))
        .use('/', express.static(__dirname + '/'))

        // exercise 1
        .get("/ex-1/:dbName/:collection", getCollection)

        // exercise 2
        .post('/ex-2/greeting', createGreeting)
        .get("/greeting/:_id", getGreeting)
        .get("/greetings", getGreetings)
        .delete('/ex-2/greeting/:_id', deleteGreeting)
        .put("/update/greeting/:_id", updateGreeting)

        // handle 404s
        .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))

        .listen(PORT, () => console.log(`Listening on port ${PORT}`));
