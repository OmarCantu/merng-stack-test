const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://<user>:<password>@cluster0.<yyyy>.mongodb.net/<database>?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('connected to DB');
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening for requests on port 4000...');
});
