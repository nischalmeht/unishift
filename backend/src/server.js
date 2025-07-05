
const express = require('express');
// const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const logsRouter = require('./routes/logs');
const connection = require('./db/db');

const PORT = 3000;
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');
dotenv.config()

// Set up Express app
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin (React)
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: function(error) {
        if(!error.originalError) {
            return error;
        }
        return {
            message: error.message,
            data: error.originalError.data || null,
            status: error.originalError.statusCode || 500,
            locations: error.locations,
            path: error.path
        };
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connection()
});
