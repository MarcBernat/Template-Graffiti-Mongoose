import express from 'express';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import graffiti from '@risingstack/graffiti';
import {getSchema} from '@risingstack/graffiti-mongoose';
import User from './user';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/graphql');
const port = process.env.PORT || 8080;
const schema = getSchema([User]);


// set up example server

const app = express();

// parse body as json
app.use(json());

app.use(graffiti.express({
    schema: schema,
    context: {} // custom context
}));

// redirect all requests to /graphql
// to open GraphiQL by default
app.use((req, res) => {
    res.redirect('/graphql');
});

app.listen(3000);