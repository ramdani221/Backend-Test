var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerDocument = require('./swagger.json');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
}

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var booksRouter = require('./routes/books');

var app = express();

const options = {
    definition: swaggerDocument,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/books', booksRouter);

module.exports = app;
