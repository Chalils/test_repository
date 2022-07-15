const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
// Import routes
const v1 = require('./src/api/v1/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = ['http://localhost:3015', 'http://localhost:3011','http://localhost:3012'];
app.use(cors(corsOptions));

// Welcome page API
app.get('/', (req, res) => {
  res.status(200).json({ message: 'MDI backend' });
});

// Use routes in app
app.use('/', v1);
app.use('/', v2);
app.use('/', v3);
app.use('/', v4);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  console.log({ err_message: err.message, err_stack: err.stack });

  res.status(err.status || 500).json({
    code   : err.status || 500,
    message: process.env.node_env === 'localhost' ? { err_message: err.message, err_stack: err.stack } : 'Internal Server Error',
  });
});

module.exports = app;
